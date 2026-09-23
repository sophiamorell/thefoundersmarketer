"use client";

import { useEffect, useRef, useState } from "react";
import { anchors, diagnostic, release } from "@/content";
import { DiagnosticForm } from "@/components/DiagnosticForm";

/**
 * 10 · The diagnostic (#diagnostic): the teal block. Left, the kicker,
 * heading, intro and the yellow "Start the diagnostic" button. Right, the
 * "What comes back" card; pressing Start swaps that card for the wizard
 * (the quiz itself isn't part of the design reference, so it lives on the
 * same card). The form component takes the questions and a mode prop.
 */
export function Diagnostic() {
  const [started, setStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) cardRef.current?.focus();
  }, [started]);

  return (
    <section id={anchors.diagnostic} className="section" aria-labelledby="diagnostic-heading">
      <div className="diag">
        <div>
          <p className="kicker diag__kicker">{diagnostic.kicker}</p>
          <h2 id="diagnostic-heading" className="diag__heading">
            {diagnostic.heading}
          </h2>
          <p className="diag__intro">{diagnostic.intro}</p>
          {!started && (
            <button type="button" className="button button--yellow diag__start" onClick={() => setStarted(true)}>
              {diagnostic.startLabel}
            </button>
          )}
        </div>
        <div className="diag__card" ref={cardRef} tabIndex={-1}>
          {started ? (
            <DiagnosticForm questions={diagnostic.questions} mode={release.diagnostic} />
          ) : (
            <>
              <span className="label">{diagnostic.comesBack.label}</span>
              <ul className="comes-back">
                {diagnostic.comesBack.items.map((item) => (
                  <li key={item}>
                    <span className="check" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#effaf7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="diag__note">{diagnostic.comesBack.note}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
