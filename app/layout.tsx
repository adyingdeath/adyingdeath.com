import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/navigator";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "adyingdeath's blog",
    template: "%s | adyingdeath's blog"
  },
  description: "Sharing technology, thoughts, and life",
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
      </body>
    </html>
  );
}
