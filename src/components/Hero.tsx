import { Fragment } from "react";
import { hero } from "@/content";

/**
 * 1 · Hero: wordmark, headline on two lines, lead, three bullets, close, two
 * buttons, microcopy. No image. The first headline line never wraps on its
 * own; the h1 scales down on narrow screens so it fits.
 */
export function Hero() {
  return (
    <section className="section hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="hero__wordmark">{hero.wordmark}</p>
        <h1 id="hero-heading" className="hero__headline">
          {hero.headlineLines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              <span className={i === 0 ? "hero__line hero__line--first" : "hero__line"}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <div className="hero__body">
          <p>{hero.lead}</p>
          <ul className="list">
            {hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p>{hero.close}</p>
        </div>
        <div className="button-row">
          <a href={hero.primaryCta.href} className="button button--primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="button">
            {hero.secondaryCta.label}
          </a>
        </div>
        <p className="hero__microcopy">{hero.microcopy}</p>
      </div>
    </section>
  );
}
