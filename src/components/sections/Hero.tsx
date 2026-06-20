"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { scrollToTarget } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ParticleField = dynamic(
  () => import("@/components/canvas/ParticleField"),
  { ssr: false },
);

type Props = { start: boolean };

export function Hero({ start }: Props) {
  const supportRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-caption", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".hero-support", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.9,
      });
    }, supportRef);
    return () => ctx.revert();
  }, [start, reduced]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* vignette for legibility over particles */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(2,2,2,0) 0%, rgba(2,2,2,0.85) 75%)",
        }}
      />

      <div ref={supportRef} className="shell flex flex-col items-center">
        <p
          className="hero-caption caption mb-8"
          style={{ color: "var(--accent-primary)" }}
        >
          ● Available for work · {SITE.year}
        </p>

        <h1 className="display-xl max-w-[14ch]">
          <SplitText play={start} immediate by="words" delay={0.4}>
            I build things
          </SplitText>
          <br />
          <SplitText
            play={start}
            immediate
            by="words"
            delay={0.55}
            className="text-[var(--accent-primary)]"
          >
            the web remembers.
          </SplitText>
        </h1>

        <p
          className="hero-support mt-8 max-w-[46ch] text-base"
          style={{ color: "var(--text-mid)" }}
        >
          Full-stack developer crafting interfaces that perform as good as they
          look.
        </p>

        <div className="hero-support mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={() => scrollToTarget("#work")}
            strength={0.5}
            ariaLabel="See my work"
            className="font-semibold"
          >
            <span
              className="-mx-6 -my-3 rounded-full px-7 py-3"
              style={{
                background: "var(--accent-primary)",
                color: "var(--bg-void)",
              }}
            >
              See My Work
            </span>
          </MagneticButton>

          <MagneticButton
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            strength={0.5}
            ariaLabel="Download CV"
            className="border"
          >
            <span
              className="-mx-6 -my-3 rounded-full border px-7 py-3"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-bright)",
              }}
            >
              Download CV
            </span>
          </MagneticButton>
        </div>
      </div>

      <button
        onClick={() => scrollToTarget("#work")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: "var(--text-mid)" }}
      >
        <ArrowDown size={20} className="anim-scroll-hint" />
      </button>
    </section>
  );
}
