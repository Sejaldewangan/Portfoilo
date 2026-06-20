"use client";

import { useEffect, useRef } from "react";
import { Search, PenTool, Code2, Zap, Rocket, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ICONS: Record<string, LucideIcon> = {
  Search,
  PenTool,
  Code2,
  Zap,
  Rocket,
};

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".phase").forEach((phase) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: phase, start: "top 80%", once: true },
        });
        tl.from(phase.querySelector(".phase-icon"), {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        })
          .from(
            phase.querySelector(".phase-title"),
            { x: -20, opacity: 0, duration: 0.5, ease: "expo.out" },
            "-=0.3",
          )
          .from(
            phase.querySelector(".phase-body"),
            { opacity: 0, duration: 0.5 },
            "-=0.2",
          );
      });

      // connector draw
      const line = el.querySelector<HTMLElement>(".phase-connector");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="shell py-28 md:py-40">
      <header className="mb-20">
        <p className="caption mb-4" style={{ color: "var(--accent-primary)" }}>
          How I Work
        </p>
        <h2 className="display-l">From idea to shipped.</h2>
      </header>

      <div className="relative ml-2">
        {/* vertical connector */}
        <div
          className="absolute left-[27px] top-4 bottom-4 w-px"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            className="phase-connector absolute inset-0 origin-top"
            style={{
              background: "var(--accent-primary)",
              transform: reduced ? "scaleY(1)" : "scaleY(0)",
            }}
          />
        </div>

        <div className="flex flex-col gap-14">
          {PROCESS.map((p) => {
            const Icon = ICONS[p.icon] ?? Code2;
            return (
              <div key={p.n} className="phase relative flex gap-8">
                <div
                  className="phase-icon relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-active)",
                  }}
                >
                  <Icon size={22} style={{ color: "var(--accent-primary)" }} />
                </div>
                <div className="pt-2">
                  <div className="phase-title flex items-baseline gap-4">
                    <span
                      className="font-mono text-sm"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {String(p.n).padStart(2, "0")}
                    </span>
                    <h3 className="heading">{p.title}</h3>
                  </div>
                  <p
                    className="phase-body mt-2 max-w-[44ch]"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
