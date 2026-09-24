"use client";

import { useState } from "react";
import { anchors, howItWorks, phases, pricing, release, type PhaseId } from "@/content";
import { formatPrice, mutedClass } from "@/lib/copy";

/**
 * 4 · How it works (#how): steps and pricing in one section. The intro line,
 * then the three-row step accordion: one row open at a time (or none), Step 1
 * open by default. The open row takes the card background and a terracotta
 * numeral, and its +/− flips. Each row's header carries the step's price
 * (visible open or closed) and the featured step's badge.
 *
 * Under the accordion, the total block (#pricing): "All three steps" and the
 * total, computed from the step prices and shown only when all are set, then
 * the note, the CTA, and the locals note and payment terms behind their
 * release flags.
 */
export function HowItWorks() {
  const [openId, setOpenId] = useState<PhaseId | null>(1);

  const stepPrice = (id: PhaseId) => pricing.steps.find((step) => step.phase === id);
  const allPriced = pricing.steps.every((step) => step.price !== null);
  const total = allPriced ? pricing.steps.reduce((sum, step) => sum + (step.price ?? 0), 0) : null;

  return (
    <section id={anchors.howItWorks} className="section" aria-labelledby="how-heading">
      <p className="kicker">{howItWorks.kicker}</p>
      <h2 id="how-heading" className="h2 how__heading">
        {howItWorks.heading}
      </h2>
      <p className="intro how__intro">{howItWorks.intro}</p>
      <div className="accordion">
        {phases.map((phase) => {
          const open = phase.id === openId;
          const panelId = `phase-panel-${phase.id}`;
          const triggerId = `phase-trigger-${phase.id}`;
          const price = stepPrice(phase.id);
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
                    <span className="accordion__tagline">
                      <span className="label accordion__tag">
                        {phase.tag} · <span className="nowrap">{phase.duration}</span>
                      </span>
                      {price?.featured && <span className="badge accordion__badge">{pricing.badge}</span>}
                    </span>
                    <span className={["accordion__title", mutedClass(phase.question, phase.status)].filter(Boolean).join(" ")}>
                      {phase.question}
                    </span>
                  </span>
                  {price && <span className="accordion__price">{formatPrice(price.price, pricing.emptyPrice)}</span>}
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

      <div id={anchors.pricing} className="how__total">
        <div className="how__total-row">
          <span className="how__total-label">{pricing.total.label}</span>
          <span className="accordion__price">{formatPrice(total, pricing.emptyPrice)}</span>
        </div>
        <p className="how__total-note">{pricing.total.note}</p>
        <a href={pricing.cta.href} className="how__cta">
          {pricing.cta.label}
        </a>
        {release.showLocalsNote && <p className="fineprint how__fineprint">{pricing.localsNote}</p>}
        {release.showPricingTerms && <p className="fineprint how__fineprint">{pricing.terms}</p>}
      </div>
    </section>
  );
}
