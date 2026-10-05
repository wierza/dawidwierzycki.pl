import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Restauracja } from "@/components/koncepcje/restauracja";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--c-display" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--c-body" });

export const metadata: Metadata = {
  title: "Bistro Sezon | projekt koncepcyjny strony restauracji",
  description: "Koncept strony restauracji: menu, rezerwacja stolika online, galeria i mapa dojazdu.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Restauracja />
    </div>
  );
}
