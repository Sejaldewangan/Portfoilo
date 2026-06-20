"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Client-only registration. SplitText is a paid GSAP Club plugin — we use a
// hand-rolled splitter (components/ui/SplitText.tsx) instead, so it is NOT
// registered here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
