import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import MicrosoftClarity from "./metrics/Clarity";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "refern. | The curated art reference platform",
  description:
    "The all-in-one tool to save, create, find, organize, moodboard, and share curated art references so that you can focus on creating your best work.",
  keywords: [
    "art tool",
    "art reference",
    "curated art reference",
    "image organizer",
    "moodboard",
    "reference board",
    "art inspiration finder",
    "share art references",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  applicationName: "refern. | The curated art reference platform",
  openGraph: {
    siteName: "refern. | The curated art reference platform",
    locale: "en_US",
    title: "refern. | The curated art reference platform",
    description:
      "The all-in-one art tool to save, create, find, organize, moodboard, and share curated art references so that you can focus on creating your best work.",
    type: "website",
    url: "https://my.refern.app",
    images: {
      url: "https://storage.googleapis.com/refern-static-content/opengraph.png",
      alt: "refern logo",
      type: "image/png",
      width: "1138",
      height: "596",
    },
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
        className={`${sourceSans3.className} bg-neutral-900 text-indigo-100`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-PGD3H1P8ZY" />
      <MicrosoftClarity />
    </html>
  );
}
