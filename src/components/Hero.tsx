import { anchors, diagnostic, hero } from "@/content";
import { HeckYes } from "@/components/HeckYes";

/**
 * 1 · Hero (#top): two columns. Left, the opener line with its tooltip, the
 * highlighted headline, subhead, three coral-dot bullets, two buttons and
 * the microcopy. Right, the quiz preview card: question 5's prompt and
 * fields with sample values, and a yellow Next that leads to the diagnostic.
 */
export function Hero() {
  const preview = diagnostic.questions.find((q) => q.id === hero.preview.questionId);

  return (
    <section id={anchors.top} className="section hero" aria-labelledby="hero-heading">
      <div>
        <h1 id="hero-heading" className="hero__headline">
          <HeckYes text={hero.opener} tooltip={hero.tooltip} />
          <br />
          <span className="hero__line">{hero.headline}</span>
          <span className="hl">{hero.headlineHighlight}</span>
        </h1>
        <p className="hero__subhead">{hero.subhead}</p>
        <ul className="dots hero__bullets">
          {hero.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="actions">
          <a href={hero.primaryCta.href} className="button button--primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="button button--outline">
            {hero.secondaryCta.label}
          </a>
        </div>
        <p className="hero__microcopy">{hero.microcopy}</p>
      </div>

      {preview && (
        <div className="preview" aria-hidden="true">
          <p className="label preview__label">{hero.preview.label}</p>
          <h3>{preview.prompt}</h3>
          <div className="preview__fields">
            {(preview.fields ?? []).map((field, i) => (
              <label key={field.id} className="field">
                <span className="field__label">{field.label}</span>
                <input className="input" value={hero.preview.values[i] ?? ""} readOnly tabIndex={-1} />
              </label>
            ))}
          </div>
          <div className="preview__foot">
            <span />
            <a href={hero.preview.nextHref} className="button button--yellow button--small" tabIndex={-1}>
              {hero.preview.nextLabel}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
