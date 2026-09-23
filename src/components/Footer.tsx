import { footer, logo, nav, site } from "@/content";

/**
 * Footer: the FM coin and wordmark with the tagline, the nav list (plus the
 * LinkedIn and email links when set), and the CTA with its microcopy.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer__brand">
          <span className="coin" aria-hidden="true">
            {logo.coin}
          </span>
          <span className="footer__wordmark">
            {logo.lead} <span>{logo.highlight}</span>
          </span>
        </div>
        <p className="footer__tagline">
          {footer.taglineLines.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <ul className="footer__links">
        {nav.links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        {site.linkedin !== null && (
          <li>
            <a href={site.linkedin} rel="me">
              {/* content.ts has no label for this link; the network's name is used. */}
              LinkedIn
            </a>
          </li>
        )}
        {site.email !== null && (
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        )}
      </ul>
      <div>
        <a href={footer.cta.href} className="button button--primary footer__cta">
          {footer.cta.label}
        </a>
        <p className="footer__microcopy">{footer.microcopy}</p>
      </div>
    </footer>
  );
}
