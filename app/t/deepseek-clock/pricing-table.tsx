import { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MODELS, PRICING_ROWS } from "@/app/t/deepseek-clock/deepseek-offpeak";
import { cn } from "@/lib/utils";

function formatPrice(value: number): string {
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

/**
 * These are applied through the ancestor rendered by the client clock, which
 * sets data-period="off-peak" or "peak" once it knows the current state.
 */
const OFF_PEAK_ACTIVE =
  "group-data-[period=off-peak]:bg-emerald-500/10 group-data-[period=off-peak]:font-semibold group-data-[period=off-peak]:text-emerald-600";
const PEAK_ACTIVE =
  "group-data-[period=peak]:bg-red-500/10 group-data-[period=peak]:font-semibold group-data-[period=peak]:text-red-600";

export default function PricingTable() {
  return (
    <section className="w-full max-w-3xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground">Live pricing</h2>
        <span className="text-xs font-medium text-muted-foreground">
          <span className="hidden group-data-[period=off-peak]:inline">
            Off-peak rates apply now
          </span>
          <span className="hidden group-data-[period=peak]:inline">Peak rates apply now</span>
        </span>
      </div>

      <Table className="border border-border">
        <TableHeader>
          <TableRow>
            <TableHead rowSpan={2}>
              USD / 1M tokens
            </TableHead>
            {MODELS.map((model) => (
              <TableHead key={model.id} colSpan={2} className="text-center">
                {model.label}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            {MODELS.map((model) => (
              <Fragment key={model.id}>
                <TableHead className="text-center">Off-peak</TableHead>
                <TableHead className="text-center">Peak</TableHead>
              </Fragment>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {PRICING_ROWS.map((row, index) => (
            <TableRow key={row}>
              <TableCell className="text-muted-foreground">{row}</TableCell>
              {MODELS.map((model) => (
                <Fragment key={model.id}>
                  <TableCell
                    className={cn(
                      "text-center font-mono tabular-nums text-muted-foreground/60",
                      OFF_PEAK_ACTIVE,
                    )}
                  >
                    {formatPrice(model.offPeak[index])}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center font-mono tabular-nums text-muted-foreground/60",
                      PEAK_ACTIVE,
                    )}
                  >
                    {formatPrice(model.peak[index])}
                  </TableCell>
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="mt-3 text-xs text-muted-foreground">
        Off-peak rates are half of peak rates. Weekends and Chinese public holidays are off-peak
        all day. Source:{" "}
        <a
          href="https://api-docs.deepseek.com/quick_start/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DeepSeek API pricing
        </a>
        .
      </p>
    </section>
  );
}
