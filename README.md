# The Founder's Marketer — website

One-page marketing site for the practice. Next.js (App Router), TypeScript,
deployed on Netlify. Built to `BUILD.md`; every word on the page comes from
`src/content.ts`.

## Change the words

Edit `src/content.ts`. Components never carry copy of their own, so that file
is the only place text, prices, lists and the diagnostic questions live.

- A `null` price renders as `$—`. Set `pricing.floor` to show "Phase 1 from …".
- Text in `[square brackets]` or marked `status: "placeholder"` renders muted so
  it's obvious on the preview what still needs writing.
- `release.*` flags turn v1 sections on. The components already exist.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also what Netlify runs
npm run lint
```

## Netlify

`netlify.toml` carries the build settings and the Next.js runtime plugin.
One-time setup in the Netlify dashboard:

1. **Forms → Enable form detection**, then trigger a deploy. A form named
   `diagnostic` appears (its definition is `public/__forms.html`).
2. Open that form → **Notifications** → email notification to Sophie's address.
3. **Domain management** → add `thefoundersmarketer.com` (DNS is pointed
   separately).

Submissions are also listed under Forms in Netlify. No environment variables
are needed.

## Layout

```
src/app/            layout (font, meta), page (section order), icon, robots
src/components/     one file per section; DiagnosticForm is the form
src/content.ts      all the words
src/lib/            copy helpers, track() analytics seam, public-file check
public/__forms.html Netlify Forms definition (field names must match the form)
```
