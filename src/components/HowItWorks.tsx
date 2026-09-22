import { howItWorks, pricing, type Phase, type PhaseId } from "@/content";
import { fill, mutedClass } from "@/lib/copy";

/**
 * 4 · How it works: heading, then the phase grid: three hairline-ruled
 * cards (tag and duration in mono, question, summary) that lead straight
 * into the phase accordion. Phases are a real sequence, so the tag carries
 * the number. One column under 900px.
 */
export function HowItWorks({
  id,
  phases,
  onSelect,
}: {
  id: string;
  phases: Phase[];
  onSelect: (id: PhaseId) => void;
}) {
  return (
    <section id={id} className="section" aria-labelledby="how-heading">
      <div className="container">
        <h2 id="how-heading" className="section__heading">
          {howItWorks.heading}
        </h2>
        <ol className="phase-cards">
          {phases.map((phase) => (
            <li key={phase.id} className="phase-card">
              <button
                type="button"
                className="phase-card__button"
                onClick={() => onSelect(phase.id)}
                aria-controls={`phase-panel-${phase.id}`}
              >
                <span className="phase-card__meta">
                  <span className="phase-card__tag">{fill(pricing.rowLabels.phase, { n: phase.id })}</span>
                  <span className="phase-card__duration">{phase.duration}</span>
                </span>
                <h3 className={mutedClass(phase.question, phase.status)}>{phase.question}</h3>
                <span className={["phase-card__summary", mutedClass(phase.summary, phase.status)].filter(Boolean).join(" ")}>
                  {phase.summary}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
