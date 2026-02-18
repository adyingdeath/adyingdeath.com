import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/navigator";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/google-analytics";
import { siteUrl } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "adyingdeath's blog",
    template: "%s | adyingdeath's blog"
  },
  description: "Sharing technology, thoughts, and life",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "adyingdeath's blog",
    images: [
      "/static/images/twitter-card.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "adyingdeath's blog",
    description: "Sharing technology, thoughts, and life",
    images: [
      "/static/images/twitter-card.png",
    ],
  },
  other: {
    "apple-mobile-web-app-title": "adyingdeath",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigator />
        {children}
        <Footer />
        {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
      </body>
    </html>
  );
}
