"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import {
  PEAK_WINDOWS,
  formatUtcOffset,
  getDaySegments,
  getStatus,
  getUtcOffsetMinutes,
  localMinuteOfDay,
  nextTransition,
  type DaySegment,
  type ScheduleStatus,
} from "@/app/t/deepseek-clock/deepseek-offpeak";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Geometry ───────────────────────────────────────────────────────────

const SIZE = 460;
const CENTER = SIZE / 2;
const R_OUTER = 190;
const RING_WIDTH = 24;
const R_INNER = R_OUTER - RING_WIDTH;
const R_CIRCLE = R_INNER - 16;
const R_LABEL = R_OUTER + 22;
const MINUTES_PER_DAY = 24 * 60;

/** The ring is cut into 10-minute slices, drawn as detached rounded bars. */
const SLICE_MINUTES = 10;
const SLICE_COUNT = MINUTES_PER_DAY / SLICE_MINUTES;
const BAR_WIDTH = 5;

/** How far a slice can grow inwards, and over how many minutes it fades. */
const BULGE_MAX = 12;
const BULGE_SPREAD = 40;

const OFF_PEAK_RING = "#10b981";
const OFF_PEAK_CIRCLE = "#047857";
const PEAK_RING = "#ef4444";
const PEAK_CIRCLE = "#b91c1c";

const DEFAULT_ZONE = "Asia/Shanghai";

const FALLBACK_ZONES = [
  "UTC",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

// ─── External stores (hydration-safe without effects) ───────────────────

const emptySubscribe = () => () => { };

function subscribeToClock(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

/** Seconds since the epoch; 0 is the server/hydration placeholder. */
function getClockSnapshot(): number {
  return Math.floor(Date.now() / 1000);
}

function getClockServerSnapshot(): number {
  return 0;
}

let cachedZone: string | null = null;

function getDetectedZone(): string {
  if (cachedZone === null) {
    cachedZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }
  return cachedZone;
}

let cachedZones: string[] | null = null;

function getSupportedZones(): string[] {
  if (cachedZones === null) {
    const supportedValuesOf = (
      Intl as unknown as { supportedValuesOf?: (key: string) => string[] }
    ).supportedValuesOf;
    if (typeof supportedValuesOf === "function") {
      try {
        cachedZones = supportedValuesOf("timeZone");
      } catch {
        cachedZones = FALLBACK_ZONES;
      }
    } else {
      cachedZones = FALLBACK_ZONES;
    }
  }
  return cachedZones;
}

// ─── Helpers ────────────────────────────────────────────────────────────

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

function minuteToAngle(minute: number): number {
  return (minute / MINUTES_PER_DAY) * 360;
}

/**
 * How far the bar centred on `barMinute` grows inwards, driven purely by the
 * circular distance between that centre and the current time. It is BULGE_MAX
 * only when "now" sits exactly on the bar's middle, so the bar that contains
 * the current time is not automatically at full height, and it tapers to 0 at
 * BULGE_SPREAD minutes away.
 */
function bulgeWidth(barMinute: number, nowMinute: number): number {
  const raw = Math.abs(barMinute - nowMinute);
  const distance = Math.min(raw, MINUTES_PER_DAY - raw);
  if (distance >= BULGE_SPREAD) return 0;
  return BULGE_MAX * (1 - distance / BULGE_SPREAD);
}

function ringColorAt(minute: number, runs: DaySegment[]): string {
  const run = runs.find((entry) => minute >= entry.start && minute < entry.end);
  const offPeak = run === undefined ? true : run.offPeak;
  return offPeak ? OFF_PEAK_RING : PEAK_RING;
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(days + "d");
  if (hours > 0) parts.push(hours + "h");
  parts.push(minutes + "m");
  return parts.join(" ");
}

function reasonText(status: ScheduleStatus): string {
  switch (status.reason) {
    case "weekend":
      return "Weekend: off-peak all day";
    case "holiday":
      return (status.holiday ?? "Public holiday") + ": off-peak all day";
    case "peak-hours":
      return "Inside a weekday peak window";
    default:
      return "Outside the weekday peak windows";
  }
}

// ─── Clock ──────────────────────────────────────────────────────────────

export default function DeepSeekClock({ pricing }: Readonly<{ pricing: ReactNode }>) {
  const epochSeconds = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getClockServerSnapshot,
  );
  const detectedZone = useSyncExternalStore<string | null>(
    emptySubscribe,
    getDetectedZone,
    () => null,
  );
  const zones = useSyncExternalStore<string[]>(
    emptySubscribe,
    getSupportedZones,
    () => FALLBACK_ZONES,
  );
  const [overrideZone, setOverrideZone] = useState<string | null>(null);

  const timeZone = overrideZone ?? detectedZone ?? DEFAULT_ZONE;
  const now = epochSeconds > 0 ? new Date(epochSeconds * 1000) : null;
  const status = now ? getStatus(now) : null;

  // getDaySegments is cached per time zone + local day, so recomputing it on
  // every one-second tick is just a cache lookup.
  const runs = now ? getDaySegments(timeZone, now) : [];

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    [timeZone],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [timeZone],
  );

  const zoneOptions = useMemo(() => {
    if (zones.includes(timeZone)) return zones;
    return [timeZone, ...zones];
  }, [zones, timeZone]);

  const ready = now !== null && status !== null;
  const offPeak = status?.offPeak ?? true;
  const circleColor = offPeak ? OFF_PEAK_CIRCLE : PEAK_CIRCLE;

  const timeText = now ? timeFormatter.format(now) : "--:--:--";
  const dateText = now ? dateFormatter.format(now) : "";
  const offsetText = now ? formatUtcOffset(getUtcOffsetMinutes(now, timeZone)) : "";

  const next = now !== null ? nextTransition(now) : null;
  const nextText =
    now !== null && status !== null && next !== null
      ? (status.offPeak ? "Peak" : "Off-peak") +
      " in " +
      formatDuration(next.getTime() - now.getTime())
      : "";

  const minuteOfDay = now ? localMinuteOfDay(now, timeZone) : 0;
  const peakWindowText = PEAK_WINDOWS.map((w) => w.start + "–" + w.end).join(", ");

  return (
    <div
      className="group flex w-full flex-col items-center gap-8"
      data-period={offPeak ? "off-peak" : "peak"}
    >
      {/* Controls */}
      <div className="flex flex-col items-center gap-3">
        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
          Time zone
          <Select
            value={timeZone}
            onValueChange={(value) => setOverrideZone(value)}
          >
            <SelectTrigger className={"cursor-pointer"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={true}>
              {zoneOptions.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </Label>
        {overrideZone !== null && detectedZone !== null && (
          <Button
            variant={"outline"}
            className={"cursor-pointer"}
            onClick={() => setOverrideZone(null)}
          >
            Use detected ({detectedZone})
          </Button>
        )}
      </div>

      {/* Clock */}
      <svg
        viewBox={"0 0 " + SIZE + " " + SIZE}
        className="w-full max-w-[460px]"
        role="img"
        aria-label="DeepSeek peak and off-peak clock"
      >
        {/* 10-minute bars; the ones near the current time grow inwards. */}
        {ready &&
          Array.from({ length: SLICE_COUNT }, (_, index) => {
            const minute = index * SLICE_MINUTES + SLICE_MINUTES / 2;
            const angle = minuteToAngle(minute);
            const outer = polar(angle, R_OUTER - BAR_WIDTH / 2);
            const inner = polar(angle, R_INNER + BAR_WIDTH / 2 - bulgeWidth(minute, minuteOfDay));
            const color = ringColorAt(minute, runs);
            return (
              <line
                key={index}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={color}
                strokeWidth={BAR_WIDTH}
                strokeLinecap="round"
              />
            );
          })}

        {Array.from({ length: 24 }, (_, hour) => {
          const angle = minuteToAngle(hour * 60);
          const major = hour % 3 === 0;
          const inner = polar(angle, R_OUTER + 4);
          const outer = polar(angle, R_OUTER + (major ? 12 : 7));
          return (
            <line
              key={hour}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--muted-foreground)"
              strokeWidth={major ? 1.8 : 1}
              opacity={major ? 0.9 : 0.4}
            />
          );
        })}

        {Array.from({ length: 24 }, (_, hour) => {
          if (hour % 3 !== 0) return null;
          const position = polar(minuteToAngle(hour * 60), R_LABEL);
          return (
            <text
              key={hour}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {hour}
            </text>
          );
        })}

        {ready && (
          <>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={R_CIRCLE}
              fill={circleColor}
              stroke="var(--background)"
              strokeWidth={3}
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.18))" }}
            />
            <text
              x={CENTER}
              y={CENTER - 40}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={14}
              fontWeight={700}
              letterSpacing={3}
              opacity={0.92}
            >
              {offPeak ? "OFF-PEAK" : "PEAK"}
            </text>
            <text
              x={CENTER}
              y={CENTER + 8}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={46}
              fontWeight={700}
              className="font-mono"
            >
              {timeText}
            </text>
            <text
              x={CENTER}
              y={CENTER + 42}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={12}
              opacity={0.85}
            >
              {timeZone}
            </text>
          </>
        )}
      </svg>

      {/* Status + legend */}
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge className={cn(
            offPeak ? "bg-emerald-500/15 text-emerald-600" : "bg-red-500/15 text-red-600",
          )}>
            {offPeak ? "Off-peak" : "Peak"}
          </Badge>
          {nextText !== "" && <span>{nextText}</span>}
        </div>

        {status !== null && (
          <p className="text-center text-sm text-muted-foreground">
            {reasonText(status)}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: OFF_PEAK_RING }} />
            Off-peak
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PEAK_RING }} />
            Peak
          </span>
        </div>
      </div>

      {/* Server-rendered pricing; CSS highlights the active column. */}
      {pricing}
    </div>
  );
}
