import { chromium } from "playwright-core";

const URL = "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce", // emulate the user's machine
});

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(4000); // let preloader finish

const reduced = await page.evaluate(
  () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
);

const stInfo = await page.evaluate(() => {
  const st = window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);
  return { hasGsap: !!window.gsap, hasST: !!st };
});

// Find a Work section heading, record its opacity before/after scroll
async function probe(selector) {
  const before = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { opacity: cs.opacity, transform: cs.transform };
  }, selector);
  return before;
}

const workBefore = await probe("#work h2");
// scroll to work
await page.evaluate(() => {
  const el = document.querySelector("#work");
  if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
});
await page.waitForTimeout(1500);
const workAfter = await probe("#work h2");

const bodyScrollHeight = await page.evaluate(() => document.body.scrollHeight);
const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const scrollY = await page.evaluate(() => window.scrollY);

console.log(JSON.stringify({
  reduced,
  stInfo,
  workBefore,
  workAfter,
  bodyScrollHeight,
  docHeight,
  scrollY,
  errors,
}, null, 2));

await browser.close();
