import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { TrackClicks } from "@/components/tracking";
import { CONSENT_KEY, GA_ID } from "@/lib/analytics";

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
  title: "Dawid Wierzycki | Strony i sklepy internetowe dla firm",
  description:
    "Strona dla Twojej firmy w 7 dni, sklep w 14. Płatności BLIK, RODO, Google Analytics i wizytówka Google w cenie. Strona od 1 500 zł, sklep od 3 000 zł.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE,
    siteName: "Dawid Wierzycki",
    title: "Strona albo sklep, który sprzedaje. Gotowy w 7 dni",
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
  name: "Dawid Wierzycki, strony i sklepy internetowe",
  url: SITE,
  email: "dawid@wierzycki.pl",
  image: `${SITE}/dawid.jpg`,
  legalName: "Instapara Dawid Wierzycki",
  taxID: "6782866804",
  address: { "@type": "PostalAddress", streetAddress: "Proszkowa 6", postalCode: "56-100", addressLocality: "Proszkowa", addressCountry: "PL" },
  areaServed: "PL",
  founder: { "@type": "Person", name: "Dawid Wierzycki" },
  sameAs: ["https://www.facebook.com/profile.php?id=61594763895799", "https://www.instagram.com/dawid.wierzycki/", "https://instapara.pl"],
  makesOffer: [
    { "@type": "Offer", name: "Strona internetowa", price: "1500", priceCurrency: "PLN" },
    { "@type": "Offer", name: "Sklep internetowy", price: "3000", priceCurrency: "PLN" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${instrument.variable} ${inter.variable}`}>
      <head>
        {/* Tryb zgody Google: domyślnie wszystko wyłączone, włącza się po kliknięciu „Akceptuję” */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(/(?:^|; )${CONSENT_KEY}=accepted/.test(document.cookie)||localStorage.getItem('${CONSENT_KEY}')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`gtag('js', new Date()); gtag('config', '${GA_ID}');`}</Script>
        <CookieConsent />
        <TrackClicks />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
