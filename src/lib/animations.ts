// Shared animation presets — single source of truth for the motion language.

export const EASE = {
  expo: "expo.out",
  expoInOut: "expo.inOut",
  back: "back.out(1.7)",
  power2: "power2.inOut",
} as const;

export const DUR = {
  micro: 0.15,
  standard: 0.4,
  cinematic: 1.2,
  epic: 2.0,
} as const;

export const STAGGER = 0.08;

/** Standard section reveal: fade + rise. Spread into a gsap.from(). */
export const revealFrom = {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: EASE.expo,
};

/** Staggered list reveal. */
export const staggerFrom = {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: EASE.expo,
  stagger: STAGGER,
};

/** ScrollTrigger config that plays once when element enters viewport. */
export const enterTrigger = (trigger: Element, start = "top 85%") => ({
  trigger,
  start,
  toggleActions: "play none none none" as const,
});
