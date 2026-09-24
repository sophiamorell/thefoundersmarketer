"use client";

import { useState } from "react";
import { anchors, howItWorks, phases, release, type PhaseId } from "@/content";
import { mutedClass } from "@/lib/copy";

/**
 * 4 · How it works (#how): the three-row step accordion. One row open at a
 * time (or none); Step 1 open by default. The open row takes the card
 * background and a terracotta numeral, and its +/− flips.
 */
export function HowItWorks() {
  const [openId, setOpenId] = useState<PhaseId | null>(1);

  return (
    <section id={anchors.howItWorks} className="section" aria-labelledby="how-heading">
      <p className="kicker">{howItWorks.kicker}</p>
      <h2 id="how-heading" className="h2 how__heading">
        {howItWorks.heading}
      </h2>
      <div className="accordion">
        {phases.map((phase) => {
          const open = phase.id === openId;
          const panelId = `phase-panel-${phase.id}`;
          const triggerId = `phase-trigger-${phase.id}`;
          return (
            <div key={phase.id} className={open ? "accordion__row accordion__row--open" : "accordion__row"}>
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  className="accordion__trigger"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : phase.id)}
                >
                  <span className="accordion__numeral" aria-hidden="true">
                    {phase.numeral}
                  </span>
                  <span className="accordion__head">
                    <span className="label accordion__tag">
                      {phase.tag} · <span className="nowrap">{phase.duration}</span>
                    </span>
                    <span className={["accordion__title", mutedClass(phase.question, phase.status)].filter(Boolean).join(" ")}>
                      {phase.question}
                    </span>
                  </span>
                  <span className="accordion__sign" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={triggerId} className="accordion__panel" hidden={!open}>
                <div>
                  <p className={["accordion__summary", mutedClass(phase.summary, phase.status)].filter(Boolean).join(" ")}>
                    {phase.summary}
                  </p>
                  {phase.yourTime !== null && (
                    <>
                      <span className="label">{howItWorks.yourTimeLabel}</span>
                      <p className="accordion__effort">{phase.yourTime}</p>
                    </>
                  )}
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
                <div>
                  <span className="label label--list">{howItWorks.youGetLabel}</span>
                  <ul className="teal-dots">
                    {phase.youGet.map((item) => (
                      <li key={item} className={mutedClass(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
