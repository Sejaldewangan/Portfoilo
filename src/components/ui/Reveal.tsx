"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";
import { revealFrom, enterTrigger, STAGGER } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Stagger direct children instead of revealing the block as one. */
  stagger?: boolean;
  /** Initial rise distance (px). */
  y?: number;
  delay?: number;
  start?: string;
  as?: ElementType;
  className?: string;
};

/**
 * Drop-in on-scroll reveal (fade + rise) via GSAP ScrollTrigger. Plays once on
 * enter. With `stagger`, its direct children animate in sequence. No-op under
 * prefers-reduced-motion — content renders fully visible.
 */
export function Reveal({
  children,
  stagger = false,
  y = revealFrom.y,
  delay = 0,
  start = "top 85%",
  as: Tag = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      // Reduced motion → gentle opacity-only fade (no large translate).
      gsap.from(targets, {
        ...revealFrom,
        y: reduced ? 0 : y,
        duration: reduced ? 0.5 : revealFrom.duration,
        delay,
        stagger: stagger ? STAGGER : 0,
        scrollTrigger: enterTrigger(el, start),
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, y, delay, start]);

  // Forwarding the ref object (not reading .current) — safe during render.
  // eslint-disable-next-line react-hooks/refs
  return createElement(Tag, { ref, className: cn(className) }, children);
}
