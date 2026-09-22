import { twoWaysIn } from "@/content";
import { mutedClass } from "@/lib/copy";

/** 2 · Two ways in: two equal cards, stacked on mobile. */
export function TwoWaysIn() {
  return (
    <section className="section" aria-labelledby="two-ways-heading">
      <div className="container">
        <h2 id="two-ways-heading" className="section__heading">
          {twoWaysIn.heading}
        </h2>
        <div className="cards">
          {twoWaysIn.cards.map((card) => (
            <div key={card.title} className={["card", mutedClass(card.title, card.status)].filter(Boolean).join(" ")}>
              <h3>{card.title}</h3>
              <ul className="list">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className={mutedClass(bullet)}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
