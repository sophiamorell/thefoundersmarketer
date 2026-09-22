import { proof } from "@/content";

/**
 * 9 · Proof (hidden in v0): testimonial cards and a before → after strip.
 * Rendered by page.tsx only when release.showProof is true. content.ts has
 * no heading for this section, so none is rendered.
 */
export function Proof() {
  const { testimonials, beforeAfter } = proof;

  return (
    <section className="section">
      <div className="container">
        {testimonials.length > 0 && (
          <ul className="testimonials">
            {testimonials.map((t) => (
              <li key={`${t.name}-${t.company}`} className="card">
                <blockquote className="testimonial">
                  <p>{t.quote}</p>
                  <footer>
                    {t.name}, {t.title}, {t.company}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}

        <div className="before-after">
          {!beforeAfter.permission && <p className="before-after__caption">{beforeAfter.companyLabel}</p>}
          <ul className="before-after__rows">
            {beforeAfter.rows.map((row) => (
              <li key={row.before} className="before-after__row">
                <span>{row.before}</span>
                <span aria-hidden="true">→</span>
                <span className="before-after__after">{row.after}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
