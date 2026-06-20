"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { scrollToTarget } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "border-b backdrop-blur-xl"
            : "border-b border-transparent",
        )}
        style={{
          background: scrolled ? "rgba(2,2,2,0.85)" : "transparent",
          borderColor: scrolled ? "var(--border-subtle)" : "transparent",
        }}
      >
        <nav
          aria-label="Primary"
          className="shell flex items-center justify-between py-4"
        >
          <button
            onClick={() => go("#home")}
            className={cn(
              "font-sans font-black tracking-tight transition-transform duration-500",
              scrolled ? "scale-90 text-xl" : "scale-100 text-2xl",
            )}
            style={{ color: "var(--text-bright)" }}
            aria-label="Back to top"
          >
            {SITE.shortName}
            <span style={{ color: "var(--accent-primary)" }}>.</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="relative caption transition-colors hover:text-[var(--text-bright)]"
                style={{
                  color:
                    active === link.href
                      ? "var(--text-bright)"
                      : "var(--text-mid)",
                }}
              >
                {link.label}
                {active === link.href && (
                  <span
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--accent-primary)" }}
                  />
                )}
              </button>
            ))}
            <MagneticButton
              onClick={() => go("#contact")}
              className="border"
              strength={0.5}
              ariaLabel="Go to contact"
            >
              <span
                style={{
                  color: "var(--bg-void)",
                  background: "var(--accent-primary)",
                }}
                className="-mx-6 -my-3 rounded-full px-6 py-3 font-medium"
              >
                Let&apos;s Talk
              </span>
            </MagneticButton>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ color: "var(--text-bright)" }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        style={{ background: "var(--bg-void)" }}
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => go(link.href)}
            className="display-l transition-all duration-500"
            style={{
              transform: open ? "translateY(0)" : "translateY(30px)",
              opacity: open ? 1 : 0,
              transitionDelay: `${open ? i * 60 + 100 : 0}ms`,
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
