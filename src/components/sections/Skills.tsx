"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SKILLS, STATS } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const pct = bar.dataset.value ?? "0";
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(pct) / 100,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="skills" className="shell py-28 md:py-40">
      <header className="mb-16">
        <p className="caption mb-4" style={{ color: "var(--accent-primary)" }}>
          Capabilities
        </p>
        <h2 className="display-l max-w-[18ch]">The tools I actually use.</h2>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        {SKILLS.map((cat) => (
          <div key={cat.category}>
            <h3 className="heading mb-8">{cat.category}</h3>
            <ul className="space-y-7">
              {cat.items.map((s) => (
                <li key={s.name}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-[var(--text-bright)]">{s.name}</span>
                    <span className="caption">{s.level}</span>
                  </div>
                  <div
                    className="h-px w-full overflow-hidden"
                    style={{ background: "var(--border-subtle)" }}
                  >
                    <div
                      className="skill-bar-fill h-full origin-left"
                      data-value={s.value}
                      style={{
                        background: "var(--accent-primary)",
                        transform: reduced
                          ? `scaleX(${s.value / 100})`
                          : "scaleX(0)",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* stat cards */}
      <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4"
        style={{ borderColor: "var(--border-subtle)", background: "var(--border-subtle)" }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="p-8"
            style={{ background: "var(--bg-surface)" }}
          >
            <Counter
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              valueClassName="display-l text-[var(--text-bright)]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
