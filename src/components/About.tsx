import Image from "next/image";
import { about, anchors } from "@/content";
import { mutedClass } from "@/lib/copy";
import { publicFileExists } from "@/lib/public-file";

/**
 * 8 · About: the arched portrait left, heading and three paragraphs right;
 * stacked under 900px. The photo path may 404, so a hatched bone placeholder
 * of the same 3:4 aspect is rendered when the file isn't in public/ at
 * build time.
 */
export function About() {
  const hasPhoto = publicFileExists(about.photo);

  return (
    <section id={anchors.about} className="section" aria-labelledby="about-heading">
      <div className="container about">
        <div
          className={["about__photo", hasPhoto ? "about__photo--image" : undefined].filter(Boolean).join(" ")}
          aria-hidden={!hasPhoto || undefined}
        >
          {hasPhoto && (
            <Image
              src={about.photo}
              alt={about.heading}
              fill
              sizes="(min-width: 900px) 260px, 100vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="about__text">
          <h2 id="about-heading">{about.heading}</h2>
          <div className="prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={mutedClass(paragraph, about.status)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
