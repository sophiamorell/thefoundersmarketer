import { howItWorks, type Phase, type PhaseId } from "@/content";
import { mutedClass } from "@/lib/copy";

/**
 * 4 · How it works: heading, three connected cards (question, duration,
 * summary), then the footnote. Phases are a real sequence, so they are
 * numbered. Cards stack vertically on mobile.
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
                <span className="phase-card__number">{phase.id}</span>
                <h3 className={mutedClass(phase.question, phase.status)}>{phase.question}</h3>
                <span className="phase-card__duration">{phase.duration}</span>
                <span className={["phase-card__summary", mutedClass(phase.summary, phase.status)].filter(Boolean).join(" ")}>
                  {phase.summary}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="footnote">{howItWorks.footnote}</p>
      </div>
    </section>
  );
}
