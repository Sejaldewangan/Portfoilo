import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp n into [min, max]. */
export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);
