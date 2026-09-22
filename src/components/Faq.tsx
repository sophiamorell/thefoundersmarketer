import { faq } from "@/content";
import { mutedClass } from "@/lib/copy";

/**
 * 10 · FAQ: native <details>/<summary> accordion. Renders the items whose
 * `show` is true (the exclusions item follows release.showExclusionsFaq).
 */
export function Faq() {
  const items = faq.items.filter((item) => item.show);

  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading" className="section__heading">
          {faq.heading}
        </h2>
        <div className="faq">
          {items.map((item) => (
            <details key={item.question} className="faq__item">
              <summary className={["faq__question", mutedClass(item.question, item.status)].filter(Boolean).join(" ")}>
                {item.question}
              </summary>
              <p className={["faq__answer", mutedClass(item.answer, item.status)].filter(Boolean).join(" ")}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
