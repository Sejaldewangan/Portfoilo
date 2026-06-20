"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** 0..1 — fraction of cursor offset followed (max ~20px). */
  strength?: number;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

/**
 * Button/link whose body and inner label drift toward the cursor while hovered,
 * springing back on leave. No-op under reduced motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.4,
  className,
  ariaLabel,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const move = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    const cx = gsap.utils.clamp(-20, 20, x);
    const cy = gsap.utils.clamp(-20, 20, y);
    gsap.to(ref.current, { x: cx, y: cy, duration: 0.4, ease: "power3.out" });
    gsap.to(labelRef.current, {
      x: cx * 0.4,
      y: cy * 0.4,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const reset = () => {
    if (!ref.current) return;
    gsap.to([ref.current, labelRef.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors will-change-transform",
    className,
  );

  const inner = (
    <span ref={labelRef} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={move}
        onMouseLeave={reset}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      className={classes}
    >
      {inner}
    </button>
  );
}
