"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE, PRELOADER_PHRASES } from "@/lib/content";

type Props = { onComplete: () => void };

/**
 * Cinematic full-screen loader. Non-linear 0→100 counter, rotating status line,
 * then a horizontal split reveal. Plays once per session (sessionStorage).
 * Locks body scroll while active.
 */
export function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(PRELOADER_PHRASES[0]);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    document.body.classList.remove("no-scroll");
    setHidden(true);
    onComplete();
  };

  useEffect(() => {
    // Already shown this session, or reduced motion → skip entirely.
    const seen = sessionStorage.getItem("preloaded");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || reduced) {
      finish();
      return;
    }

    sessionStorage.setItem("preloaded", "1");
    document.body.classList.add("no-scroll");

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      const tl = gsap.timeline();

      tl.to(counter, {
        val: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.round(counter.val);
          setProgress(v);
          if (v < 45) setPhrase(PRELOADER_PHRASES[0]);
          else if (v < 90) setPhrase(PRELOADER_PHRASES[1]);
          else setPhrase(PRELOADER_PHRASES[2]);
        },
      });

      tl.to(".preloader-counter", { opacity: 0, duration: 0.2 });
      tl.to(
        ".preloader-top",
        { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
        "split",
      );
      tl.to(
        ".preloader-bottom",
        { yPercent: 100, duration: 0.9, ease: "expo.inOut" },
        "split",
      );
      tl.add(finish, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[120]"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress} percent`}
    >
      {/* split halves */}
      <div
        className="preloader-top absolute inset-x-0 top-0 h-1/2"
        style={{ background: "var(--bg-void)" }}
      />
      <div
        className="preloader-bottom absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "var(--bg-void)" }}
      />

      {/* content overlay (above the halves) */}
      <div className="preloader-counter absolute inset-0 flex flex-col items-center justify-center">
        <div className="display-xl tabular-nums">{progress}%</div>
        <div className="caption mt-4">{phrase}</div>
      </div>

      <div className="absolute bottom-6 left-6 caption tracking-[0.3em]">
        {SITE.name}
      </div>
      <div className="absolute bottom-6 right-6 caption">
        {SITE.year} · Portfolio
      </div>
    </div>
  );
}
