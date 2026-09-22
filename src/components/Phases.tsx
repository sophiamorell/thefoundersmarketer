"use client";

import { useRef, useState } from "react";
import { anchors, phases, type PhaseId } from "@/content";
import { HowItWorks } from "@/components/HowItWorks";
import { PhaseDetail } from "@/components/PhaseDetail";

/**
 * Sections 4 and 5 share one piece of state: which phase's panel is open.
 * Clicking a card in section 4 opens that panel and scrolls to section 5.
 */
export function Phases() {
  const [openId, setOpenId] = useState<PhaseId>(1);
  const detailRef = useRef<HTMLElement>(null);

  const openFromCard = (id: PhaseId) => {
    setOpenId(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    detailRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <HowItWorks id={anchors.howItWorks} phases={phases} onSelect={openFromCard} />
      <PhaseDetail
        ref={detailRef}
        phases={phases}
        openId={openId}
        onToggle={(id) => setOpenId(id)}
      />
    </>
  );
}
