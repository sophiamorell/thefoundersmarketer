"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { CopyStatus } from "@/content";
import { mutedClass } from "@/lib/copy";

type Item = { title: string; image: string; available: boolean };

/** Thumbnail grid + native <dialog> lightbox for section 7. */
export function Thumbnails({ items, status }: { items: Item[]; status: CopyStatus }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Item | null>(null);

  const open = (item: Item) => {
    setCurrent(item);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <ul className="thumbs">
        {items.map((item) => (
          <li key={item.title}>
            <button type="button" className="thumb__button" onClick={() => open(item)}>
              <span className="thumb__image">
                {item.available && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </span>
              <span className={["thumb__title", mutedClass(item.title, status)].filter(Boolean).join(" ")}>
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={current?.title}
        onClose={() => setCurrent(null)}
      >
        {current && (
          <>
            <div className="lightbox__image">
              {current.available && (
                <Image src={current.image} alt={current.title} fill sizes="100vw" style={{ objectFit: "contain" }} />
              )}
            </div>
            <div className="lightbox__bar">
              <span className={mutedClass(current.title, status)}>{current.title}</span>
              <button type="button" className="button" onClick={close}>
                ×
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
