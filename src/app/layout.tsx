import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const SITE = "https://dawidwierzycki.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Dawid Wierzycki — strony i sklepy internetowe dla firm",
  description:
    "Strona albo sklep dla Twojej firmy w 10 dni. Płatności BLIK, RODO, Google Analytics i wizytówka Google w cenie. Strona od 1 500 zł, sklep od 3 000 zł.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE,
    siteName: "Dawid Wierzycki",
    title: "Strona albo sklep, który sprzedaje — gotowy w 10 dni",
    description: "Strony i sklepy internetowe dla małych firm. Płatności, RODO i analityka w cenie.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#13201b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dawid Wierzycki — strony i sklepy internetowe",
  url: SITE,
  email: "dawid@wierzycki.pl",
  image: `${SITE}/dawid.jpg`,
  areaServed: "PL",
  founder: { "@type": "Person", name: "Dawid Wierzycki" },
  makesOffer: [
    { "@type": "Offer", name: "Strona internetowa", price: "1500", priceCurrency: "PLN" },
    { "@type": "Offer", name: "Sklep internetowy", price: "3000", priceCurrency: "PLN" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
