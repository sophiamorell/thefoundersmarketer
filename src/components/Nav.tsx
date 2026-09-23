import { nav } from "@/content";
import { Logo } from "@/components/Logo";

/**
 * Sticky header: the sticker logo left, nav links and the terracotta CTA
 * right. Below 900px only the logo and CTA remain.
 */
export function Nav() {
  return (
    <header className="nav">
      <Logo />
      <nav className="nav__links">
        {nav.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href={nav.cta.href} className="nav__cta">
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
