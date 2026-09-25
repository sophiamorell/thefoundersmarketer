/** Opening the "Talk to Sophie" contact popup from anywhere on the page. */

export const CONTACT_OPEN_EVENT = "contact:open";

export function openContact(): void {
  window.dispatchEvent(new Event(CONTACT_OPEN_EVENT));
}
