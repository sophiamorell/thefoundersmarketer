/**
 * Opening the diagnostic popup from anywhere on the page.
 *
 * DiagnosticModal listens for OPEN_EVENT. Buttons call openDiagnostic();
 * every link to #diagnostic (nav, hero, checklist, pricing, footer) is
 * caught by the modal's click listener, so those stay plain anchors and
 * still scroll to the section if the script hasn't loaded.
 */

export const OPEN_EVENT = "diagnostic:open";

export function openDiagnostic(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
