import { hero } from "@/content";

/** 1 · Hero: wordmark, headline, lead, three bullets, close, two buttons, microcopy. No image. */
export function Hero() {
  return (
    <section className="section hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="hero__wordmark">{hero.wordmark}</p>
        <h1 id="hero-heading">{hero.headline}</h1>
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
