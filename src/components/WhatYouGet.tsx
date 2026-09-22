import { whatYouGet } from "@/content";
import { publicFileExists } from "@/lib/public-file";
import { Thumbnails } from "@/components/Thumbnails";

/**
 * 7 · What you get (hidden in v0): four 4:3 thumbnails with a lightbox.
 * Rendered by page.tsx only when release.showWhatYouGet is true. Images that
 * haven't been supplied yet render as neutral placeholder blocks.
 */
export function WhatYouGet() {
  const items = whatYouGet.items.map((item) => ({
    ...item,
    available: publicFileExists(item.image),
  }));

  return (
    <section className="section" aria-labelledby="what-you-get-heading">
      <div className="container">
        <h2 id="what-you-get-heading" className="section__heading">
          {whatYouGet.heading}
        </h2>
        <Thumbnails items={items} status={whatYouGet.status} />
      </div>
    </section>
  );
}
