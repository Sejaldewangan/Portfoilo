"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/content";
import { scrollToTarget } from "@/hooks/useSmoothScroll";

export function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    // brief accent flash
    const flash = document.createElement("div");
    flash.style.cssText =
      "position:fixed;inset:0;background:var(--accent-primary);opacity:0.12;z-index:90;pointer-events:none;transition:opacity 80ms linear;";
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 120);
    });
    scrollToTarget(0);
  };

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="shell flex items-center justify-between py-8">
        <p className="caption">
          © {SITE.year} {SITE.name}. Built with Next.js + GSAP.
        </p>
        <button
          onClick={toTop}
          aria-label="Scroll to top"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-bright)",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(10px)",
            pointerEvents: show ? "auto" : "none",
          }}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
