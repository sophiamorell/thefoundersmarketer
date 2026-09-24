import { anchors, phases, pricing, release } from "@/content";
import { fill, formatPrice, mutedClass } from "@/lib/copy";

/**
 * 6 · Pricing (#pricing): three tier cards. The featured tier is dark with
 * the yellow shadow, badge and CTA. Each card lists the step prices and the
 * "All three" total; a null price renders as `emptyPrice`, and the total
 * only when every step is priced. Terms render while
 * release.showPricingTerms is true.
 */
export function Pricing() {
  return (
    <section id={anchors.pricing} className="section" aria-labelledby="pricing-heading">
      <p className="kicker">{pricing.kicker}</p>
      <h2 id="pricing-heading" className="h2">
        {pricing.heading}
      </h2>
      <p className="intro pricing__intro">{pricing.intro}</p>
      <ul className="tiers">
        {pricing.tiers.map((tier) => {
          const rows = phases.map((phase) => ({
            key: `phase${phase.id}` as const,
            label: fill(pricing.rowLabels.phase, { n: phase.id }),
            price: tier.prices[`phase${phase.id}`],
          }));
          const allPriced = rows.every((row) => row.price !== null);
          const total = allPriced ? rows.reduce((sum, row) => sum + (row.price ?? 0), 0) : null;
          return (
            <li key={tier.id} className={tier.featured ? "tier tier--featured" : "tier"}>
              <span className="badge">{pricing.badge}</span>
              <p className="label tier__label">{tier.label}</p>
              <h3>{tier.name}</h3>
              <p className={["tier__who", mutedClass(tier.whoLine)].filter(Boolean).join(" ")}>{tier.whoLine}</p>
              <div className="tier__rows">
                {rows.map((row, i) => (
                  <div key={row.key} className="tier__row">
                    <span>{row.label}</span>
                    <span className={i === 0 ? "tier__price tier__price--first" : "tier__price"}>
                      {formatPrice(row.price, pricing.emptyPrice)}
                    </span>
                  </div>
                ))}
                <div className="tier__row">
                  <span>{pricing.rowLabels.total}</span>
                  <span className="tier__price tier__price--total">{formatPrice(total, pricing.emptyPrice)}</span>
                </div>
              </div>
              <a href={pricing.cta.href} className="tier__cta">
                {pricing.cta.label}
              </a>
            </li>
          );
        })}
      </ul>
      {release.showPricingTerms && <p className="fineprint pricing__terms">{pricing.terms}</p>}
    </section>
  );
}
