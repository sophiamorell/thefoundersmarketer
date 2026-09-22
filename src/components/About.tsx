import Image from "next/image";
import { about, anchors } from "@/content";
import { mutedClass } from "@/lib/copy";
import { publicFileExists } from "@/lib/public-file";

/**
 * 8 · About: photo left, heading and three paragraphs right; stacked on
 * mobile. The photo path may 404 in v0, so a neutral block of the same
 * aspect is rendered when the file isn't in public/ at build time.
 */
export function About() {
  const hasPhoto = publicFileExists(about.photo);

  return (
    <section id={anchors.about} className="section" aria-labelledby="about-heading">
      <div className="container about">
        <div className="about__photo" aria-hidden={!hasPhoto || undefined}>
          {hasPhoto && (
            <Image
              src={about.photo}
              alt={about.heading}
              fill
              sizes="(min-width: 768px) 22rem, 100vw"
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
