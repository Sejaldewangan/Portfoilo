"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
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

  const shown = pad ? String(value).padStart(pad, "0") : String(value);

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
