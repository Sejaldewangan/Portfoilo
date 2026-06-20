"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS, type Project } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChapterVisual } from "./ChapterVisual";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <section id="work" className="shell py-28 md:py-40">
      <header className="mb-20 flex items-end justify-between">
        <div>
          <p className="caption mb-4" style={{ color: "var(--accent-primary)" }}>
            Selected Work · {PROJECTS.length} of {PROJECTS.length}
          </p>
          <h2 className="display-l">Things I&apos;ve shipped.</h2>
        </div>
      </header>

      <div className="flex flex-col gap-28 md:gap-40">
        {PROJECTS.map((p, i) => (
          <Row key={p.n} project={p} reverse={i % 2 === 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function Row({
  project,
  reverse,
  index,
}: {
  project: Project;
  reverse: boolean;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = rowRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".work-text", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from(".work-visual", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  // pointer tilt (pure JS, no GSAP)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={rowRef}
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[direction:rtl]",
      )}
    >
      <div className="work-text [direction:ltr]">
        <div className="caption mb-6 flex items-center gap-3">
          <span style={{ color: "var(--accent-primary)" }}>{project.n}</span>
          <span style={{ color: "var(--text-dim)" }}>
            / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="display-l mb-5">{project.name}</h3>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="caption rounded-full border px-3 py-1"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mb-4 max-w-[50ch]" style={{ color: "var(--text-mid)" }}>
          {project.description}
        </p>
        <p className="caption mb-8" style={{ color: "var(--accent-muted)" }}>
          ▸ {project.metric}
        </p>
        <div className="flex gap-3">
          <MagneticButton
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="border"
            ariaLabel={`${project.name} live site`}
          >
            <span
              className="-mx-6 -my-3 flex items-center gap-1 rounded-full border px-5 py-2.5"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              Live <ArrowUpRight size={15} />
            </span>
          </MagneticButton>
          <MagneticButton
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border"
            ariaLabel={`${project.name} source`}
          >
            <span
              className="-mx-6 -my-3 flex items-center gap-1 rounded-full border px-5 py-2.5"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              GitHub <ArrowUpRight size={15} />
            </span>
          </MagneticButton>
        </div>
      </div>

      <div
        className="work-visual [direction:ltr] transition-transform duration-300 ease-out"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <ChapterVisual index={index % 5} label={`project/${project.n}`} />
      </div>
    </div>
  );
}
