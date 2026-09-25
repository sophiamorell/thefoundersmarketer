import { anchors, logo } from "@/content";

/**
 * The header logo (v4, option 3e): three skewed slashes in sea glass,
 * sunflower and pink, then the Montserrat wordmark with "Marketer" in sea
 * glass. Static; it no longer changes on scroll.
 */
export function Logo() {
  return (
    <a href={`#${anchors.top}`} className="logo" aria-label={logo.ariaLabel}>
      <Slashes />
      <span className="logo__word" aria-hidden="true">
        {logo.lead} <span className="logo__mark">{logo.highlight}</span>
      </span>
    </a>
  );
}

/** The three-slash mark on its own. */
export function Slashes() {
  return (
    <span className="slashes" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

/**
 * The contained logo (v4, option 3f): the wordmark on a deep-sea plate with
 * the three stripes running through its right edge. Used in the footer.
 */
export function Nameplate() {
  return (
    <span className="nameplate">
      <span className="nameplate__stripe" aria-hidden="true" />
      <span className="nameplate__stripe" aria-hidden="true" />
      <span className="nameplate__stripe" aria-hidden="true" />
      <span className="nameplate__word">
        {logo.lead} {logo.highlight}
      </span>
    </span>
  );
}
