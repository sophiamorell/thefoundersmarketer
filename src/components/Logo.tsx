"use client";

import { useEffect, useState } from "react";
import { anchors, logo } from "@/content";

/**
 * The sticker wordmark (logo option 2a). Unscrolled it hangs below the
 * header into the hero, deep teal with "Marketer" on a yellow block; past
 * 24px of scroll it settles into the bar as a cream sticker with a
 * highlighter under "Marketer". Passive scroll listener.
 */
export function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href={`#${anchors.top}`} className={scrolled ? "logo logo--scrolled" : "logo"}>
      <span>
        {logo.lead} <span className="logo__mark">{logo.highlight}</span>
      </span>
    </a>
  );
}
