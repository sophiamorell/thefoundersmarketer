import Image from "next/image";
import { anchors, whatYouGet } from "@/content";
import { fill, mutedClass } from "@/lib/copy";
import { publicFileExists } from "@/lib/public-file";

/**
 * 5 · What you get (#deliverables): six deliverables in a three-column grid,
 * each with a 4:3 image slot, then the numeral beside the title, a pill
 * naming the step that builds it, and the body. A slot shows its caption
 * until the screenshot exists in public/. Bracketed titles and bodies render muted.
 */
export function Deliverables() {
  return (
    <section id={anchors.deliverables} className="section" aria-labelledby="deliverables-heading">
      <p className="kicker">{whatYouGet.kicker}</p>
      <h2 id="deliverables-heading" className={["h2", mutedClass(whatYouGet.heading)].filter(Boolean).join(" ")}>
        {whatYouGet.heading}
      </h2>
      <p className={["intro", "tools__intro", mutedClass(whatYouGet.intro)].filter(Boolean).join(" ")}>{whatYouGet.intro}</p>
      <ul className="tools">
        {whatYouGet.items.map((item) => {
          const hasImage = publicFileExists(item.image);
          return (
            <li key={item.numeral} className="tool">
              <div className="slot">
                {hasImage ? (
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                ) : (
                  <span>{item.slot}</span>
                )}
              </div>
              <div className="tool__body">
                <span className="tool__numeral" aria-hidden="true">
                  {item.numeral}
                </span>
                <div>
                  <h3 className={mutedClass(item.title)}>{item.title}</h3>
                  <span className="tool__step">{fill(whatYouGet.stepLabel, { n: item.step })}</span>
                  <p className={mutedClass(item.body)}>{item.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
