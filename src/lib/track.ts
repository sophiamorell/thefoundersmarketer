/**
 * Analytics seam (BUILD.md, "Analytics").
 *
 * In development this logs to the console. In production it calls
 * `window.plausible` if a Plausible script is present and otherwise does
 * nothing. No analytics script is added in v0; event names live in
 * `analytics.v0` in content.ts.
 */

type EventProps = Record<string, string | number>;

type PlausibleWindow = Window & {
  plausible?: (eventName: string, options?: { props: EventProps }) => void;
};

export function track(eventName: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.log(`[track] ${eventName}`, props ?? "");
    return;
  }

  const w = window as PlausibleWindow;
  if (typeof w.plausible === "function") {
    if (props) w.plausible(eventName, { props });
    else w.plausible(eventName);
  }
}
