"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

/**
 * Desktop-only custom cursor: a small dot that lags the pointer, expanding into
 * a ring with a label when hovering interactive/image elements. Hidden on touch
 * and under reduced motion (native cursor restored).
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // One-time client capability check → enable the custom cursor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );
      if (interactive) {
        setActive(true);
        setLabel(
          (interactive as HTMLElement).dataset.cursor ??
            (interactive.tagName === "IMG" ? "Open" : "View"),
        );
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const loop = () => {
      ring.x = lerp(ring.x, pos.x, 0.15);
      ring.y = lerp(ring.y, pos.y, 0.15);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150]">
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent-primary)" }}
      />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border transition-[width,height,background,border-color] duration-300 ease-out"
        style={{
          width: active ? 56 : 28,
          height: active ? 56 : 28,
          marginLeft: active ? -28 : -14,
          marginTop: active ? -28 : -14,
          borderColor: active ? "var(--accent-primary)" : "var(--border-subtle)",
          background: active ? "rgba(232,255,71,0.08)" : "transparent",
        }}
      >
        {label && (
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ color: "var(--accent-primary)" }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
