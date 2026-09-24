import { whyNow } from "@/content";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#effaf7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * 2 · Why marketing, why now: the timeline. Product and Sales are built
 * (teal check dots), Marketing is next (ringed dot, "You are here" badge).
 * The rail is solid teal for two thirds, then dashed.
 */
export function WhyNow() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <p className="kicker why__kicker">{whyNow.kicker}</p>
      <h2 id="why-heading" className="why__heading">
        <span className="why__line1">{whyNow.headingLines[0]}</span>
        <span className="why__line2">{whyNow.headingLines[1]}</span>
      </h2>

      <div className="timeline">
        <div className="timeline__rail" aria-hidden="true" />
        <ol className="timeline__steps">
          {whyNow.steps.map((step) => (
            <li key={step.numeral} className="step">
              <span className="step__marker">
                <span className={step.current ? "step__dot step__dot--here" : "step__dot"} aria-hidden="true">
                  {!step.current && <Check />}
                </span>
                {step.current && <span className="badge">{whyNow.badge}</span>}
              </span>
              <p className={step.current ? "label step__label step__label--here" : "label step__label"}>
                {step.numeral} · {step.status}
              </p>
              <h3 className={step.current ? "step__title--here" : undefined}>{step.title}</h3>
              <p className="step__body">
                <b>{step.lead}</b>
                <br />
                {step.body}
                {step.bodyHighlight && <span className="hl hl--wide">{step.bodyHighlight}</span>}
                {step.bodyAfter}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
