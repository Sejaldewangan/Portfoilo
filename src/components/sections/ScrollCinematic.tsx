"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChapterVisual } from "./ChapterVisual";
import { clamp } from "@/lib/utils";

const N = CHAPTERS.length;

/**
 * THE SHOWSTOPPER. A 500vh scroll-locked sequence: an inner panel stays sticky
 * while five chapters crossfade through it, driven by a single scrubbed
 * ScrollTrigger. A progress rail on the right fills as chapters advance.
 */
export function ScrollCinematic() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const chapters = gsap.utils.toArray<HTMLElement>(".cine-chapter");
    const railFill = wrap.querySelector<HTMLElement>(".cine-rail-fill");

    const setters = chapters.map((c) => ({
      opacity: gsap.quickSetter(c, "opacity"),
      y: gsap.quickSetter(c, "y", "px"),
      scale: gsap.quickSetter(c.querySelector(".cine-visual"), "scale"),
    }));

    gsap.set(chapters, { opacity: 0, y: 40 });
    gsap.set(chapters[0], { opacity: 1, y: 0 });

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (railFill) railFill.style.transform = `scaleY(${p})`;

        chapters.forEach((_, i) => {
          const t = p * N - i; // chapter-local progress, active in [0,1]
          let opacity = 0;
          let y = 40;
          let scale = 1;
          if (t >= -0.25 && t <= 1.25) {
            // fade in over first 0.2, hold, fade out over last 0.2
            const fadeIn = clamp(t / 0.2, 0, 1);
            const fadeOut = clamp((1 - t) / 0.2, 0, 1);
            opacity = Math.min(fadeIn, fadeOut);
            y = (1 - clamp(t, 0, 1)) * 40 - clamp(t - 1, 0, 1) * 40;
            scale = 1 + (1 - opacity) * 0.04;
          }
          setters[i].opacity(opacity);
          setters[i].y(y);
          setters[i].scale(scale);
        });
      },
    });

    return () => st.kill();
  }, [reduced]);

  // Reduced-motion: plain readable stack, no pin/scrub.
  if (reduced) {
    return (
      <section aria-label="What I value" className="shell py-24">
        <div className="flex flex-col gap-24">
          {CHAPTERS.map((c, i) => (
            <div key={i} className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <ChapterVisual index={i} label={c.visualLabel} />
              <div>
                <p className="caption mb-4" style={{ color: "var(--accent-primary)" }}>
                  {c.kicker}
                </p>
                <h2 className="display-l">{c.title}</h2>
                <p className="mt-4 text-lg" style={{ color: "var(--text-mid)" }}>
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div
      ref={wrapRef}
      aria-label="What I value"
      className="relative"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* progress rail */}
        <div
          className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 md:block"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            className="cine-rail-fill absolute inset-0 origin-top"
            style={{ background: "var(--accent-primary)", transform: "scaleY(0)" }}
          />
        </div>

        {/* stacked chapters */}
        <div className="shell relative h-[70vh] w-full">
          {CHAPTERS.map((c, i) => (
            <div
              key={i}
              className="cine-chapter absolute inset-0 grid items-center gap-10 will-change-transform lg:grid-cols-2"
            >
              <div className="cine-visual order-2 will-change-transform lg:order-1">
                <ChapterVisual index={i} label={c.visualLabel} />
              </div>
              <div className="order-1 lg:order-2">
                <p
                  className="caption mb-4"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {c.kicker}
                </p>
                <h2 className="display-l">{c.title}</h2>
                <p
                  className="mt-5 max-w-[40ch] text-lg"
                  style={{ color: "var(--text-mid)" }}
                >
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
