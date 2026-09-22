import { anchors, diagnostic, release } from "@/content";
import { DiagnosticForm } from "@/components/DiagnosticForm";

/**
 * 11 · The diagnostic: the page's one dark section and its destination.
 * Full-bleed teal ground with the heading and intro on the left, and the
 * wizard on raised paper on the right (stacked under 900px). The form
 * component takes the questions array and a mode prop; `release.diagnostic`
 * chooses between "form" and "stepper".
 */
export function Diagnostic() {
  return (
    <section id={anchors.diagnostic} className="band" aria-labelledby="diagnostic-heading">
      <div className="container band__inner">
        <div>
          <h2 id="diagnostic-heading" className="band__heading">
            {diagnostic.heading}
          </h2>
          <p className="band__intro">{diagnostic.intro}</p>
        </div>
        <DiagnosticForm questions={diagnostic.questions} mode={release.diagnostic} />
      </div>
    </section>
  );
}
