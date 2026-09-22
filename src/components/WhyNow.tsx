import { whyNow } from "@/content";

/**
 * 2 · Why now: two columns, stacked on mobile. Left, a plain bullet list
 * under its title; right, two short paragraphs under its title.
 */
export function WhyNow() {
  return (
    <section className="section" aria-labelledby="why-now-heading">
      <div className="container">
        <h2 id="why-now-heading" className="section__heading">
          {whyNow.heading}
        </h2>
        <div className="columns">
          <div className="column">
            <h3>{whyNow.left.title}</h3>
            <ul className="list">
              {whyNow.left.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3>{whyNow.right.title}</h3>
            <div className="prose">
              {whyNow.right.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
