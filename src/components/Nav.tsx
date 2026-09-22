import { nav, site } from "@/content";

/**
 * Sticky nav: wordmark left, three anchor links, one button to #diagnostic.
 * Below 768px the links are hidden by CSS and only wordmark + button remain.
 */
export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#main" className="nav__wordmark">
          {site.name}
        </a>
        <nav>
          <ul className="nav__links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={nav.cta.href} className="button button--primary nav__cta">
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}
