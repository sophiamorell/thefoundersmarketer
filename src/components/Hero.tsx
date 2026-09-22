import { hero } from "@/content";

/** 1 · Hero: wordmark, headline, body, two buttons. No image. */
export function Hero() {
  return (
    <section className="section hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="hero__wordmark">{hero.wordmark}</p>
        <h1 id="hero-heading">{hero.headline}</h1>
        <p className="hero__body">{hero.body}</p>
        <div className="button-row">
          <a href={hero.primaryCta.href} className="button button--primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="button">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
