"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE, TIMELINE } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PARAS = [
  "I started coding because I wanted to build the things I kept imagining. That itch never went away — it just got sharper.",
  "I work component-first and performance-aware. I'd rather delete code than add it, and I treat every interaction as a decision, not a default.",
  "Right now I'm chasing the overlap of motion, performance, and real product depth — interfaces that feel inevitable.",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { rotate: 0 },
          {
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="about" className="shell py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[60%_40%]">
        {/* text */}
        <div>
          <p className="caption mb-6" style={{ color: "var(--accent-primary)" }}>
            Who I Am
          </p>
          <h2 className="display-l mb-12 max-w-[16ch]">
            Code is my medium. The web is my canvas.
          </h2>

          <div className="space-y-6 text-lg" style={{ color: "var(--text-mid)" }}>
            {PARAS.map((p, i) => (
              <p key={i}>
                <SplitText by="words" stagger={0.012} duration={0.7}>
                  {p}
                </SplitText>
              </p>
            ))}
          </div>

          {/* timeline */}
          <ol className="mt-16 flex gap-8 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
            {TIMELINE.map((t) => (
              <li key={t.year} className="min-w-[120px]">
                <div
                  className="mb-3 h-px w-full"
                  style={{ background: "var(--border-subtle)" }}
                />
                <p
                  className="font-sans text-xl font-bold"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {t.year}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-mid)" }}>
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* sticky visual */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            ref={photoRef}
            className="relative aspect-[4/5] w-full"
            style={{ willChange: "transform" }}
          >
            {/* offset brutalist frame */}
            <div
              className="absolute inset-0 translate-x-2 translate-y-2 border-2"
              style={{ borderColor: "var(--accent-primary)" }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Replace with <Image src="/profile.jpg" .../> */}
              <span className="caption">[ your photo ]</span>
            </div>
          </div>

          {/* terminal whoami */}
          <div
            className="mt-8 rounded-lg border p-5 font-mono text-sm"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <Line cmd="whoami" out={`${SITE.name} — ${SITE.role}`} />
            <Line cmd="location" out={SITE.city} />
            <Line cmd="status" out="🟢 Open to opportunities" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ cmd, out }: { cmd: string; out: string }) {
  return (
    <div className="mb-2 last:mb-0">
      <p>
        <span style={{ color: "var(--accent-primary)" }}>$</span>{" "}
        <span style={{ color: "var(--text-bright)" }}>{cmd}</span>
      </p>
      <p style={{ color: "var(--text-mid)" }}>&gt; {out}</p>
    </div>
  );
}
