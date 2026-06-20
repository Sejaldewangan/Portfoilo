"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  by?: "words" | "chars";
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  /** Animate immediately on mount instead of waiting for scroll. */
  immediate?: boolean;
  /** Gate the mount-time animation (e.g. wait for preloader to finish). */
  play?: boolean;
  as?: ElementType;
  className?: string;
};

/**
 * Free, hand-rolled replacement for GSAP's paid SplitText plugin.
 * Splits text into word/char spans and reveals them with a staggered rise.
 * Under reduced-motion the text simply renders — no animation, fully visible.
 */
export function SplitText({
  children,
  by = "words",
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  ease = "expo.out",
  immediate = false,
  play = true,
  as: Tag = "span",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const tokens =
    by === "words" ? children.split(/(\s+)/) : Array.from(children);

  useEffect(() => {
    if (reduced || !play) return;
    const el = ref.current;
    if (!el) return;

    const parts = el.querySelectorAll<HTMLElement>("[data-split]");
    if (!parts.length) return;

    const ctx = gsap.context(() => {
      gsap.set(parts, { yPercent: 110, opacity: 0 });
      const anim = {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
      };

      if (immediate) {
        gsap.to(parts, anim);
      } else {
        gsap.to(parts, {
          ...anim,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, play, immediate, delay, stagger, duration, ease]);

  return (
    <Tag ref={ref} className={cn("inline-block", className)} aria-label={children}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return token;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom"
          >
            <span data-split className="inline-block will-change-transform">
              {token}
            </span>
          </span>
        );
      }) as ReactNode}
    </Tag>
  );
}
