import type { Metadata } from "next";

import WidthLimit from "@/components/container";
import { siteUrl } from "@/lib/site-config";

import DeepSeekClock from "./deepseek-clock";
import PricingTable from "./pricing-table";

const pageTitle = "DeepSeek Peak / Off-Peak Clock";
const pageDescription =
  "Check whether DeepSeek API pricing is in peak or off-peak hours right now, in your own time zone. See the peak windows, Chinese holidays and current token prices.";
const pagePath = "/t/deepseek-clock";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "DeepSeek",
    "DeepSeek off-peak hours",
    "DeepSeek peak hours",
    "DeepSeek API pricing",
    "DeepSeek discount hours",
    "DeepSeek 峰谷时段",
    "DeepSeek 空闲时段",
    "peak and off-peak pricing clock",
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    url: pagePath,
    title: pageTitle,
    description: pageDescription,
    siteName: "adyingdeath's blog",
    images: [
      {
        url: "/static/images/twitter-card.png",
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/static/images/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: pageTitle,
      description: pageDescription,
      url: siteUrl + pagePath,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Shows DeepSeek peak and off-peak billing hours in any IANA time zone",
        "Highlights the current billing period and counts down to the next switch",
        "Lists current DeepSeek token prices for both peak and off-peak",
      ],
      publisher: {
        "@type": "Organization",
        name: "adyingdeath's blog",
        url: siteUrl,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageTitle,
          item: siteUrl + pagePath,
        },
      ],
    },
  ],
};

export default function DeepSeekClockPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <WidthLimit className="my-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            DeepSeek Peak / Off-Peak Clock
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A full day in your time zone: red is peak, green is off-peak.
          </p>
        </div>

        <DeepSeekClock pricing={<PricingTable />} />

        <section className="mt-16 w-full max-w-3xl text-left">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            How DeepSeek peak and off-peak hours work
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              DeepSeek bills the API at two rates, and off-peak rates are half of peak rates.
              Peak hours are{" "}
              <strong className="font-medium text-foreground">
                01:00–04:00 and 06:00–10:00 UTC, Monday to Friday, excluding Chinese public
                holidays
              </strong>
              . In Beijing time that is 09:00–12:00 and 14:00–18:00.
            </p>
            <p>
              Every other hour is off-peak, including weekends and Chinese public holidays in
              full. A holiday that falls on a working day is therefore billed at off-peak rates
              for the whole day.
            </p>
            <p>
              The clock always draws a complete day in the selected time zone with 00:00 at the
              top, so changing the time zone simply rotates the peak windows. It defaults to the
              zone your browser reports, and the price table below the clock follows the same
              state.
            </p>
            <p>
              Chinese public holiday dates are hardcoded, currently for 2026, until the State
              Council publishes the next year&apos;s arrangement.
            </p>
          </div>
        </section>
      </WidthLimit>
    </div>
  );
}
