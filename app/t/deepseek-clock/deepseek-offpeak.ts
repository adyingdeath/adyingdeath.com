/**
 * DeepSeek API peak / off-peak schedule, hardcoded.
 *
 * Official rule (https://api-docs.deepseek.com/quick_start/pricing):
 *
 *   "Off-peak rates are half of the peak rates. Peak hours are 01:00 - 04:00
 *    and 06:00 - 10:00 UTC, Monday through Friday, excluding Chinese public
 *    holidays. All other hours are off-peak, including weekends and Chinese
 *    public holidays in full."
 *
 * In Beijing time (UTC+8) the peak windows are Monday to Friday 09:00-12:00 and
 * 14:00-18:00. Everything else is off-peak: weekends, Chinese public holidays in
 * full, and the hours outside the two peak windows on working weekdays.
 *
 * China has a single time zone without daylight saving, so UTC+8 is a constant.
 */

const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const DAY_MINUTES = 24 * 60;

// ─── Hardcoded rules ────────────────────────────────────────────────────

export interface PeakWindow {
  /** "HH:mm" in Beijing time, inclusive. */
  start: string;
  /** "HH:mm" in Beijing time, exclusive. */
  end: string;
}

/** Weekday peak windows (Beijing time). Anything outside them is off-peak. */
export const PEAK_WINDOWS: PeakWindow[] = [
  { start: "09:00", end: "12:00" },
  { start: "14:00", end: "18:00" },
];

export interface PublicHoliday {
  label: string;
  /** Inclusive first day, "YYYY-MM-DD" in Beijing time. */
  from: string;
  /** Inclusive last day, "YYYY-MM-DD" in Beijing time. */
  to: string;
}

/**
 * Chinese public holidays, billed entirely as off-peak.
 *
 * Source: 国办发明电〔2025〕7号 (State Council General Office, 2025-11-04).
 * Update this list once the next year's notice is published.
 */
export const PUBLIC_HOLIDAYS: PublicHoliday[] = [
  { label: "New Year's Day", from: "2026-01-01", to: "2026-01-03" },
  { label: "Spring Festival", from: "2026-02-15", to: "2026-02-23" },
  { label: "Qingming Festival", from: "2026-04-04", to: "2026-04-06" },
  { label: "Labour Day", from: "2026-05-01", to: "2026-05-05" },
  { label: "Dragon Boat Festival", from: "2026-06-19", to: "2026-06-21" },
  { label: "Mid-Autumn Festival", from: "2026-09-25", to: "2026-09-27" },
  { label: "National Day", from: "2026-10-01", to: "2026-10-07" },
];

// ─── Pricing (USD per 1M tokens) ────────────────────────────────────────

/** Row labels, matching the price array order below. */
export const PRICING_ROWS = [
  "1M input tokens (cache hit)",
  "1M input tokens (cache miss)",
  "1M output tokens",
];

export interface ModelPricing {
  id: string;
  label: string;
  /** [cache hit, cache miss, output] in USD per 1M tokens. */
  offPeak: number[];
  /** [cache hit, cache miss, output] in USD per 1M tokens. */
  peak: number[];
}

export const MODELS: ModelPricing[] = [
  {
    id: "deepseek-flash",
    label: "deepseek-flash",
    offPeak: [0.003, 0.15, 0.6],
    peak: [0.006, 0.3, 1.2],
  },
  {
    id: "deepseek-v4-pro",
    label: "deepseek-v4-pro",
    offPeak: [0.022, 0.66, 1.98],
    peak: [0.044, 1.32, 3.96],
  },
];

// ─── Schedule evaluation ────────────────────────────────────────────────

export type OffPeakReason = "weekend" | "holiday" | "off-hours" | "peak-hours";

export interface BeijingParts {
  /** "YYYY-MM-DD" in Beijing time. */
  date: string;
  /** 0 = Sunday … 6 = Saturday. */
  weekday: number;
  /** Minutes since Beijing midnight. */
  minutes: number;
}

export interface ScheduleStatus {
  offPeak: boolean;
  reason: OffPeakReason;
  /** Set when reason is "holiday". */
  holiday?: string;
  /** Beijing-time components the decision was based on. */
  beijing: BeijingParts;
}

function pad2(value: number): string {
  return value < 10 ? "0" + value : String(value);
}

function beijingParts(date: Date): BeijingParts {
  const shifted = new Date(date.getTime() + BEIJING_OFFSET_MS);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth() + 1;
  const day = shifted.getUTCDate();
  return {
    date: String(year) + "-" + pad2(month) + "-" + pad2(day),
    weekday: shifted.getUTCDay(),
    minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes(),
  };
}

function parseHhMm(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

/** The holiday covering the given instant, if any. */
export function findHoliday(date: Date): PublicHoliday | undefined {
  const key = beijingParts(date).date;
  return PUBLIC_HOLIDAYS.find((holiday) => key >= holiday.from && key <= holiday.to);
}

/** Whether the instant falls in a DeepSeek off-peak window. */
export function isOffPeak(date: Date): boolean {
  return getStatus(date).offPeak;
}

/** Full off-peak/peak decision, with the reason for display. */
export function getStatus(date: Date): ScheduleStatus {
  const beijing = beijingParts(date);

  if (beijing.weekday === 0 || beijing.weekday === 6) {
    return { offPeak: true, reason: "weekend", beijing };
  }

  const holiday = PUBLIC_HOLIDAYS.find(
    (entry) => beijing.date >= entry.from && beijing.date <= entry.to,
  );
  if (holiday !== undefined) {
    return { offPeak: true, reason: "holiday", holiday: holiday.label, beijing };
  }

  const inPeak = PEAK_WINDOWS.some((window) => {
    const start = parseHhMm(window.start);
    const end = parseHhMm(window.end);
    return beijing.minutes >= start && beijing.minutes < end;
  });

  return {
    offPeak: !inPeak,
    reason: inPeak ? "peak-hours" : "off-hours",
    beijing,
  };
}

/** The next instant (minute resolution) at which the status flips. */
export function nextTransition(from: Date): Date {
  const current = isOffPeak(from);
  const start = Math.ceil(from.getTime() / MINUTE_MS) * MINUTE_MS;
  const limit = start + 21 * DAY_MINUTES * MINUTE_MS;
  for (let ts = start; ts <= limit; ts += MINUTE_MS) {
    if (isOffPeak(new Date(ts)) !== current) {
      return new Date(ts);
    }
  }
  return new Date(limit);
}

// ─── Time-zone helpers ──────────────────────────────────────────────────

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone);
  if (formatter === undefined) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

function zonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = partsFormatter(timeZone).formatToParts(date);
  const values: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = Number(part.value);
    }
  }
  // Some engines report midnight as hour 24; treat it as the next day at 00.
  let dayOffset = 0;
  let hour = values.hour;
  if (hour === 24) {
    hour = 0;
    dayOffset = 1;
  }
  return {
    year: values.year,
    month: values.month,
    day: values.day + dayOffset,
    hour,
    minute: values.minute,
    second: values.second,
  };
}

function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = zonedParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return asUtc - date.getTime();
}

/** Wall-clock time in a time zone -> the matching instant. */
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  minutes: number,
  timeZone: string,
): Date {
  const wallUtc = Date.UTC(year, month - 1, day, 0, 0, 0) + minutes * MINUTE_MS;
  let ts = wallUtc;
  for (let i = 0; i < 3; i += 1) {
    const next = wallUtc - timeZoneOffsetMs(new Date(ts), timeZone);
    if (next === ts) {
      break;
    }
    ts = next;
  }
  return new Date(ts);
}

/** "YYYY-MM-DD" of the instant as seen in a time zone. */
export function localDateKey(date: Date, timeZone: string): string {
  const parts = zonedParts(date, timeZone);
  return String(parts.year) + "-" + pad2(parts.month) + "-" + pad2(parts.day);
}

/** Minutes since local midnight (fractional, so seconds are included). */
export function localMinuteOfDay(date: Date, timeZone: string): number {
  const parts = zonedParts(date, timeZone);
  return parts.hour * 60 + parts.minute + parts.second / 60;
}

/** Offset of a time zone from UTC, in minutes, at the given instant. */
export function getUtcOffsetMinutes(date: Date, timeZone: string): number {
  return timeZoneOffsetMs(date, timeZone) / MINUTE_MS;
}

/** "UTC+08:00" style label for an offset in minutes. */
export function formatUtcOffset(minutes: number): string {
  const sign = minutes < 0 ? "-" : "+";
  const absolute = Math.abs(minutes);
  return "UTC" + sign + pad2(Math.floor(absolute / 60)) + ":" + pad2(absolute % 60);
}

export interface DaySegment {
  /** Minutes from local midnight, inclusive. */
  start: number;
  /** Minutes from local midnight, exclusive. */
  end: number;
  offPeak: boolean;
}

/**
 * Split a local day into contiguous off-peak / peak runs, so the ring can be
 * drawn with a handful of arcs instead of one per minute.
 */
const segmentsCache = new Map<string, DaySegment[]>();

export function getDaySegments(timeZone: string, reference: Date): DaySegment[] {
  const parts = zonedParts(reference, timeZone);
  const cacheKey =
    timeZone + "|" + parts.year + "-" + pad2(parts.month) + "-" + pad2(parts.day);

  const cached = segmentsCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const dayStart = zonedTimeToUtc(parts.year, parts.month, parts.day, 0, timeZone);
  const dayEnd = zonedTimeToUtc(parts.year, parts.month, parts.day, DAY_MINUTES, timeZone);

  // A normal local day is exactly 24h long, so a single offset conversion is
  // enough. DST transition days fall back to an exact per-minute conversion.
  const uniform = dayEnd.getTime() - dayStart.getTime() === DAY_MINUTES * MINUTE_MS;
  const isOffPeakAt = (minutes: number): boolean =>
    isOffPeak(
      uniform
        ? new Date(dayStart.getTime() + minutes * MINUTE_MS)
        : zonedTimeToUtc(parts.year, parts.month, parts.day, minutes, timeZone),
    );

  const segments: DaySegment[] = [];
  let runStart = 0;
  let runOffPeak = isOffPeakAt(0);

  for (let minute = 1; minute < DAY_MINUTES; minute += 1) {
    const offPeak = isOffPeakAt(minute);
    if (offPeak !== runOffPeak) {
      segments.push({ start: runStart, end: minute, offPeak: runOffPeak });
      runStart = minute;
      runOffPeak = offPeak;
    }
  }

  segments.push({ start: runStart, end: DAY_MINUTES, offPeak: runOffPeak });
  if (segmentsCache.size > 200) {
    segmentsCache.clear();
  }
  segmentsCache.set(cacheKey, segments);
  return segments;
}
