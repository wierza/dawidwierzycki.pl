import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Kancelaria } from "@/components/koncepcje/kancelaria";

const display = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--c-display" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--c-body" });

export const metadata: Metadata = {
  title: "Kancelaria Adwokacka | projekt koncepcyjny strony",
  description: "Koncept strony kancelarii: specjalizacje, umawianie konsultacji online, FAQ i treści zgodne z etyką zawodową.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Kancelaria />
    </div>
  );
}
