"use client";

import { anchors, howItWorks, phases, pricing, release, type PhaseId } from "@/content";
import { fill, formatPrice, mutedClass } from "@/lib/copy";
import { openContact } from "@/lib/contact-modal";

/**
 * 4 · How it works (#how), option 1a: steps and pricing in one section.
 * Kicker, heading and lead; a duration bar sized by each step's weeks; three
 * step cards with every deliverable visible (Step 1 featured, with the
 * badge); then the bundle row (#pricing): the total, computed from the step
 * prices and shown only when all are set, a cost comparison with a senior
 * marketer, and the "Talk to Sophie" button that opens the contact popup.
 * The locals note and payment terms sit under it behind release flags.
 */
export function HowItWorks() {
  const stepPrice = (id: PhaseId) => pricing.steps.find((step) => step.phase === id);
  const allPriced = pricing.steps.every((step) => step.price !== null);
  const total = allPriced ? pricing.steps.reduce((sum, step) => sum + (step.price ?? 0), 0) : null;

  return (
    <section id={anchors.howItWorks} className="section" aria-labelledby="how-heading">
      <p className="kicker">{howItWorks.kicker}</p>
      <h2 id="how-heading" className="h2">
        {howItWorks.heading}
      </h2>
      <p className="intro how__intro">{howItWorks.intro}</p>

      <div className="how__bar" aria-hidden="true" style={{ gridTemplateColumns: phases.map((p) => `${p.weeks}fr`).join(" ") }}>
        {phases.map((phase) => (
          <span key={phase.id} />
        ))}
      </div>

      <ol className="steps">
        {phases.map((phase) => {
          const price = stepPrice(phase.id);
          return (
            <li key={phase.id} className={price?.featured ? "stepcard stepcard--featured" : "stepcard"}>
              <div className="stepcard__meta">
                <span className="label">
                  {phase.tag} · {phase.duration}
                </span>
                {price?.featured && <span className="badge">{pricing.badge}</span>}
              </div>
              <p className="stepcard__question">{phase.question}</p>
              <h3 className={["stepcard__outcome", mutedClass(phase.outcome, phase.status)].filter(Boolean).join(" ")}>
                {phase.outcome}
              </h3>
              <p className="label stepcard__keep">{howItWorks.youKeepLabel}</p>
              <ul className="stepcard__list">
                {phase.youKeep.map((item) => (
                  <li key={item} className={mutedClass(item)}>
                    {item}
                  </li>
                ))}
              </ul>
              {phase.yourTime !== null && (
                <p className="stepcard__time">{fill(howItWorks.yourTimeLabel, { time: phase.yourTime })}</p>
              )}
              {price && (
                <div className="stepcard__price">
                  <span className="stepcard__amount">{formatPrice(price.price, pricing.emptyPrice)}</span>
                  <span className="stepcard__fixed">{pricing.fixedLabel}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div id={anchors.pricing} className="bundle">
        <div>
          <p className="bundle__total">
            <span>{pricing.bundle.label}</span>
            <span>{formatPrice(total, pricing.emptyPrice)}</span>
          </p>
          <div className="bundle__compare">
            {pricing.bundle.comparison.map((row) => (
              <div key={row.label} className={row.ours ? "bundle__row bundle__row--ours" : "bundle__row"}>
                <span className="bundle__label">{row.label}</span>
                <span className="bundle__track" aria-hidden="true">
                  <span className="bundle__bar" style={{ width: `${row.share * 100}%` }} />
                </span>
              </div>
            ))}
          </div>
          <p className="bundle__caption">{pricing.bundle.caption}</p>
        </div>
        <button type="button" className="bundle__cta" onClick={openContact}>
          {pricing.ctaLabel}
        </button>
      </div>

      {release.showLocalsNote && <p className="how__footnote">{pricing.localsNote}</p>}
      {release.showPricingTerms && <p className="how__footnote">{pricing.terms}</p>}
    </section>
  );
}
