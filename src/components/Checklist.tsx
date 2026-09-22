"use client";

import { useId, useState } from "react";
import { checklist } from "@/content";
import { fill, mutedClass } from "@/lib/copy";

/**
 * 3 · Does this sound like you? Six checkboxes in the sage tint block.
 * Below them one line: `ctaBefore` + the CTA button; once the checked count
 * reaches `threshold` the line becomes `ctaCounted` with {n} replaced.
 * State lives in React only.
 */
export function Checklist() {
  const uid = useId();
  const [checked, setChecked] = useState<boolean[]>(() => checklist.items.map(() => false));
  const count = checked.filter(Boolean).length;
  const reached = count >= checklist.threshold;

  const toggle = (index: number) =>
    setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));

  return (
    <section className="section" aria-labelledby="checklist-heading">
      <div className="container">
        <div className="tintblock">
          <h2 id="checklist-heading" className="section__heading">
            {checklist.heading}
          </h2>
          <ul className="checklist__items">
            {checklist.items.map((item, i) => {
              const id = `${uid}-item-${i}`;
              return (
                <li key={item}>
                  <label htmlFor={id} className={["checklist__item", mutedClass(item)].filter(Boolean).join(" ")}>
                    <input id={id} type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
                    <span>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <p className="checklist__cta" aria-live="polite">
            <span>{reached ? fill(checklist.ctaCounted, { n: count }) : checklist.ctaBefore}</span>
            <a href={checklist.ctaHref} className="button button--primary">
              {checklist.ctaLabel}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
