import type { CopyStatus } from "@/content";

/**
 * Copy-status helpers (BUILD.md, "Inputs and the one rule about copy").
 *
 * Text marked `status: "placeholder"`, or wrapped in [square brackets], renders
 * as-is but visually muted so Sophie can see on the preview what still needs
 * writing. `status: "draft"` is real copy and renders normally.
 */

export function isBracketed(text: string): boolean {
  const t = text.trim();
  return t.startsWith("[") && t.endsWith("]");
}

export function isMuted(text: string, status?: CopyStatus): boolean {
  return status === "placeholder" || isBracketed(text);
}

/** Class name for muted (placeholder) copy, or undefined when it's real copy. */
export function mutedClass(text: string, status?: CopyStatus): string | undefined {
  return isMuted(text, status) ? "placeholder" : undefined;
}

/** Replace `{key}` tokens in a content string, e.g. "That's {n}." */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** A price from content.ts: null renders as `emptyPrice` ("$—"). */
export function formatPrice(price: number | null, emptyPrice: string): string {
  return price === null ? emptyPrice : usd.format(price);
}
