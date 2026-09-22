import type { Ref } from "react";
import { release, type Phase, type PhaseId } from "@/content";
import { mutedClass } from "@/lib/copy";

/**
 * 5 · Phase detail: accordion, one panel per phase, Phase 1 open by default.
 * Each panel: `job`, a list under `youGetHeading`, then `yourTime` (skipped
 * when null). `weekByWeek` renders only when release.showPhase1WeekByWeek.
 */
export function PhaseDetail({
  ref,
  phases,
  openId,
  onToggle,
}: {
  ref: Ref<HTMLElement>;
  phases: Phase[];
  openId: PhaseId;
  onToggle: (id: PhaseId) => void;
}) {
  return (
    <section ref={ref} className="section">
      <div className="container">
        <div className="accordion">
          {phases.map((phase) => {
            const open = phase.id === openId;
            const panelId = `phase-panel-${phase.id}`;
            const triggerId = `phase-trigger-${phase.id}`;
            const muted = mutedClass("", phase.status);
            return (
              <div key={phase.id} className="accordion__item">
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    className="accordion__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => onToggle(phase.id)}
                  >
                    <span>
                      {phase.id}. {phase.question}
                    </span>
                    <span className="accordion__marker" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={["accordion__panel", muted].filter(Boolean).join(" ")}
                  hidden={!open}
                >
                  <p>{phase.job}</p>
                  <h4>{phase.youGetHeading}</h4>
                  <ul className="list">
                    {phase.youGet.map((item) => (
                      <li key={item} className={mutedClass(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {phase.yourTime !== null && <p>{phase.yourTime}</p>}
                  {release.showPhase1WeekByWeek && phase.weekByWeek && (
                    <table className="week-table">
                      <tbody>
                        {phase.weekByWeek.map((row) => (
                          <tr key={row.period}>
                            <th scope="row">{row.period}</th>
                            <td>{row.activity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
