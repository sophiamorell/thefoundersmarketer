"use client";

import { useState } from "react";

type TierView = {
  id: string;
  label: string;
  whoLine: string;
  whoClass?: string;
  prices: { label: string; value: string }[];
};

/**
 * The pricing table's mobile form (below 600px): a segmented control that
 * picks a tier, and one stacked card with that tier's who-line and prices.
 * The middle tier is selected by default. Hidden by CSS at wider widths.
 */
export function TierPicker({ tiers }: { tiers: TierView[] }) {
  const [activeId, setActiveId] = useState(tiers[Math.min(1, tiers.length - 1)]?.id);
  const active = tiers.find((tier) => tier.id === activeId) ?? tiers[0];
  if (!active) return null;

  return (
    <div className="tier-picker">
      <div className="tier-picker__control" role="group">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className="tier-picker__option"
            aria-pressed={tier.id === active.id}
            onClick={() => setActiveId(tier.id)}
          >
            {tier.label}
          </button>
        ))}
      </div>
      <div className="tier-card" aria-live="polite">
        <h3>{active.label}</h3>
        <p className={["tier-card__who", active.whoClass].filter(Boolean).join(" ")}>{active.whoLine}</p>
        {active.prices.length > 0 && (
          <dl>
            {active.prices.map((price) => (
              <div key={price.label} style={{ display: "contents" }}>
                <dt>{price.label}</dt>
                <dd>{price.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
