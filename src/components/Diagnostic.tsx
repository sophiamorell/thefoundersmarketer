import { anchors, diagnostic, release } from "@/content";
import { DiagnosticForm } from "@/components/DiagnosticForm";

/**
 * 11 · The diagnostic. v0: all ten questions on one screen, submitted to
 * Netlify Forms. The form component takes the questions array and a mode
 * prop; `release.diagnostic` chooses between "form" (v0) and "stepper" (v1).
 */
export function Diagnostic() {
  return (
    <section id={anchors.diagnostic} className="section" aria-labelledby="diagnostic-heading">
      <div className="container">
        <h2 id="diagnostic-heading" className="section__heading">
          {diagnostic.heading}
        </h2>
        <p className="section__intro">{diagnostic.intro}</p>
        <DiagnosticForm questions={diagnostic.questions} mode={release.diagnostic} />
      </div>
    </section>
  );
}
