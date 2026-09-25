/**
 * Netlify Forms: a urlencoded POST, including form-name, to the static
 * form definitions in public/__forms.html. Throws on a non-2xx response.
 */
const FORM_ENDPOINT = "/__forms.html";

export async function postForm(fields: Record<string, string>): Promise<void> {
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields).toString(),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}
