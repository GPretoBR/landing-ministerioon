import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["600", "700", "800"],
  // "optional" evita a troca tardia de fonte no título (que atrasava o LCP no 4G).
  display: "optional",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "MinisterioOn: gestão completa para igrejas, com app para membros e Pix integrado";
const description =
  "Secretaria, tesouraria com Pix integrado, matriz e filiais e aplicativo para os membros em um só lugar. Membros ilimitados em todos os planos, sem fidelidade.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}/`,
    siteName: site.name,
    title,
    description,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${site.url}/og.png`] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#393e99",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  offers: { "@type": "AggregateOffer", priceCurrency: "BRL", lowPrice: "59.90", highPrice: "299.90", offerCount: 3 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
