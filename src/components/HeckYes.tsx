"use client";

import { useState } from "react";

/** The hero's opener line with its hover tooltip (160ms fade and rise). */
export function HeckYes({ text, tooltip }: { text: string; tooltip: string }) {
  const [on, setOn] = useState(false);
  return (
    <span className="hero__opener" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {text}
      <span className={on ? "tip tip--on" : "tip"} aria-hidden="true">
        {tooltip}
      </span>
    </span>
  );
}
