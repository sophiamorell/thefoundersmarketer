import { footer, site } from "@/content";
import { mutedClass } from "@/lib/copy";

/** Footer: wordmark, `footer.line`, LinkedIn and email links, privacy note. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__wordmark">{footer.wordmark}</p>
        <p className="footer__line">{footer.line}</p>
        {(site.linkedin !== null || site.email !== null) && (
          <ul className="footer__links">
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
        )}
        <p className={["footer__privacy", mutedClass(footer.privacyNote)].filter(Boolean).join(" ")}>
          {footer.privacyNote}
        </p>
      </div>
    </footer>
  );
}
