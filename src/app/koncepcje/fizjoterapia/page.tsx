import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Fizjo } from "@/components/koncepcje/fizjo";

const display = DM_Serif_Display({ subsets: ["latin", "latin-ext"], weight: "400", style: ["normal", "italic"], variable: "--c-display" });
const body = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--c-body" });

export const metadata: Metadata = {
  title: "Studio Ruchu | projekt koncepcyjny strony gabinetu fizjoterapii",
  description: "Koncept strony gabinetu: cennik zabiegów, zespół, rezerwacja wizyty online krok po kroku.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Fizjo />
    </div>
  );
}
