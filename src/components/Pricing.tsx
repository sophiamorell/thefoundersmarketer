import { anchors, phases, pricing, release } from "@/content";
import { fill, formatPrice, mutedClass } from "@/lib/copy";
import { TierPicker } from "@/components/TierPicker";

/**
 * 6 · Pricing: heading, a table whose columns are the tiers and whose rows
 * are the who-line and Phase 1-3 prices. A phase row renders only when at
 * least one tier has a price for it; a null cell in a shown row renders as
 * `emptyPrice`. With every price null the table is tier labels, who-line and
 * the CTA. `floorLabel` renders only when `floor` is set; terms and add-ons
 * only when release.showPricingTerms. Below 600px the table becomes a
 * segmented tier picker with one stacked card (the design system's pattern).
 */
export function Pricing() {
  const phaseRows = phases
    .map((phase) => ({
      id: phase.id,
      label: fill(pricing.rowLabels.phase, { n: phase.id }),
      key: `phase${phase.id}` as const,
    }))
    .filter((row) => pricing.tiers.some((tier) => tier.prices[row.key] !== null));
  const whoMuted = mutedClass("", pricing.whoLinesStatus);

  return (
    <section id={anchors.pricing} className="section" aria-labelledby="pricing-heading">
      <div className="container">
        <h2 id="pricing-heading" className="section__heading pricing__heading">
          {pricing.heading}
        </h2>

        <table className="pricing-table">
          <thead>
            <tr>
              <td />
              {pricing.tiers.map((tier) => (
                <th key={tier.id} scope="col">
                  {tier.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{pricing.rowLabels.who}</th>
              {pricing.tiers.map((tier) => (
                <td key={tier.id} className={["who", whoMuted, mutedClass(tier.whoLine)].filter(Boolean).join(" ")}>
                  {tier.whoLine}
                </td>
              ))}
            </tr>
            {phaseRows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.label}</th>
                {pricing.tiers.map((tier) => (
                  <td key={tier.id} className="price">
                    {formatPrice(tier.prices[row.key], pricing.emptyPrice)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <TierPicker
          tiers={pricing.tiers.map((tier) => ({
            id: tier.id,
            label: tier.label,
            whoLine: tier.whoLine,
            whoClass: [whoMuted, mutedClass(tier.whoLine)].filter(Boolean).join(" ") || undefined,
            prices: phaseRows.map((row) => ({
              label: row.label,
              value: formatPrice(tier.prices[row.key], pricing.emptyPrice),
            })),
          }))}
        />

        {pricing.floor !== null && (
          <p className="pricing__floor">
            {fill(pricing.floorLabel, { price: formatPrice(pricing.floor, pricing.emptyPrice) })}
          </p>
        )}

        {release.showPricingTerms && (
          <div className="pricing__terms">
            <p>{pricing.terms}</p>
            <p>{pricing.addOnsIntro}</p>
            <ul>
              {pricing.addOns.map((addOn) => (
                <li key={addOn}>{addOn}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="pricing__cta">
          <a href={pricing.cta.href} className="button button--primary">
            {pricing.cta.label}
          </a>
        </p>
      </div>
    </section>
  );
}
