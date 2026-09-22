import { release } from "@/content";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyNow } from "@/components/WhyNow";
import { Checklist } from "@/components/Checklist";
import { Phases } from "@/components/Phases";
import { Pricing } from "@/components/Pricing";
import { WhatYouGet } from "@/components/WhatYouGet";
import { About } from "@/components/About";
import { Proof } from "@/components/Proof";
import { Faq } from "@/components/Faq";
import { Diagnostic } from "@/components/Diagnostic";
import { Footer } from "@/components/Footer";

/**
 * The one route. Eleven sections in the order BUILD.md gives; the hidden
 * ones (7 and 9 in v0) exist in code and render only when their release flag
 * is true.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WhyNow />
        <Checklist />
        {/* Sections 4 and 5 share state: a card click opens the matching panel. */}
        <Phases />
        <Pricing />
        {release.showWhatYouGet && <WhatYouGet />}
        <About />
        {release.showProof && <Proof />}
        <Faq />
        <Diagnostic />
      </main>
      <Footer />
    </>
  );
}
