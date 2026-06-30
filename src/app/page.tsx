"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { Preloader } from "@/components/preloader/Preloader";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { ScrollCinematic } from "@/components/sections/ScrollCinematic";
import { Work } from "@/components/sections/Work";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Home() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  // The preloader locks the body at 100vh while loading, so every ScrollTrigger
  // mounts against a collapsed document and caches wrong positions. Once the
  // preloader exits and real height is restored, recompute them.
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    // Re-run after layout settles (fonts, lazy canvas, late images).
    const t1 = setTimeout(refresh, 200);
    const t2 = setTimeout(refresh, 800);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
    };
  }, [ready]);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Nav />
      <main id="main">
        <Hero start={ready} />
        <ScrollCinematic />
        <Work />
        <Skills />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
