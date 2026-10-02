import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Work } from "@/components/work";
import { Pricing } from "@/components/pricing";
import { Calculator } from "@/components/calculator";
import { About, Booking, Contact, Faq, Footer, Process } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Pricing />
        <Calculator />
        <Process />
        <About />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
