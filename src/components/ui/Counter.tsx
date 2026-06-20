"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  target: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  duration?: number;
  /** Pad to N digits, e.g. 2 → "01". */
  pad?: number;
  className?: string;
  valueClassName?: string;
};

/** Counts 0 → target when scrolled into view. */
export function Counter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration = 1.6,
  pad,
  className,
  valueClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => setValue(Math.round(obj.val)),
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, target, duration]);

  // Reduced motion → show the final number, no count-up.
  const display = reduced ? target : value;
  const shown = pad ? String(display).padStart(pad, "0") : String(display);

  return (
    <div ref={ref} className={className}>
      <span className={cn("tabular-nums", valueClassName)}>
        {prefix}
        {shown}
        {suffix}
      </span>
      {label && <span className="caption mt-2 block">{label}</span>}
    </div>
  );
}
