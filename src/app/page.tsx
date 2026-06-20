"use client";

import { useState } from "react";
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
