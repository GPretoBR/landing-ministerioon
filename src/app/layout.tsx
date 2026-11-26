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

const title = "MinisterioOn: sistema de gestão para igrejas com matriz e filiais";
const description =
  "Membros, visitantes, agenda, escalas, células, patrimônio e relatórios da sua igreja em um só painel, da sede a cada filial. Planos a partir de R$ 49,90 por mês.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
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
  offers: { "@type": "AggregateOffer", priceCurrency: "BRL", lowPrice: "49.90", highPrice: "299.00", offerCount: 5 },
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
