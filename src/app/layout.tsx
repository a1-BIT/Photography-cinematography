import type { Metadata, Viewport } from "next";
import { brandName } from "@/lib/brand";
import "./globals.css";
const url = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(url || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  ...(url ? { alternates: { canonical: "/" } } : {}),
  title: `${brandName} — Photography & Cinematography`,
  description: `Stories in every frame. Explore photography and cinematography by ${brandName}, from weddings and fashion to events and commercial stories.`,
  openGraph: { title: `${brandName} — Stories in every frame`, siteName: brandName, description: "Photography & cinematography. A considered eye. An honest story.", type: "website", ...(url ? { url } : {}), images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#f4f3ed" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
