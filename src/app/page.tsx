import { release } from "@/content";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyNow } from "@/components/WhyNow";
import { Checklist } from "@/components/Checklist";
import { HowItWorks } from "@/components/HowItWorks";
import { Deliverables } from "@/components/Deliverables";
import { About } from "@/components/About";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { Diagnostic } from "@/components/Diagnostic";
import { Footer } from "@/components/Footer";
import { DiagnosticModal } from "@/components/DiagnosticModal";

/**
 * The one route: header, hero, why now, the checklist, how it works (with
 * pricing), what you get, about, FAQ, testimonials, the diagnostic, footer,
 * and the diagnostic popup. Sections behind a release flag exist in code and
 * render only when the flag is true.
 */
export default function HomePage() {
  return (
    <div className="page">
      <Nav />
      <main id="main">
        <Hero />
        <WhyNow />
        <Checklist />
        <HowItWorks />
        {release.showWhatYouGet && <Deliverables />}
        <About />
        <Faq />
        {release.showProof && <Testimonials />}
        <Diagnostic />
      </main>
      <Footer />
      <DiagnosticModal />
    </div>
  );
}
