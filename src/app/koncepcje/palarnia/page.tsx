import type { Metadata } from "next";
import { Space_Grotesk, Young_Serif } from "next/font/google";
import { Palarnia } from "@/components/koncepcje/palarnia";

const display = Young_Serif({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--c-display" });
const body = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--c-body" });

export const metadata: Metadata = {
  title: "Ziarno & Żar | projekt koncepcyjny sklepu internetowego",
  description: "Koncept sklepu palarni kawy: produkty z filtrami, koszyk, dostawa do paczkomatu i płatność BLIK.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Palarnia />
    </div>
  );
}
