// Dependency-free confetti burst from screen center. Skipped under reduced motion.

const COLORS = ["#e8ff47", "#a3b82a", "#f0ede8", "#ffffff"];

type Piece = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
};

export function burst(count = 80) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const frag = document.createDocumentFragment();
  const pieces: Piece[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 6;
    el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${
      size * 0.5
    }px;background:${
      COLORS[i % COLORS.length]
    };pointer-events:none;z-index:200;border-radius:1px;will-change:transform,opacity;`;
    frag.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 9;
    pieces.push({
      el,
      x: 0,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      rot: 0,
      spin: Math.random() * 12 - 6,
    });
  }
  document.body.appendChild(frag);

  let life = 0;
  const tick = () => {
    life += 1;
    const opacity = Math.max(0, 1 - life / 90);
    for (const p of pieces) {
      p.vy += 0.35; // gravity
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
      p.el.style.opacity = String(opacity);
    }
    if (opacity > 0 && life < 100) {
      requestAnimationFrame(tick);
    } else {
      for (const p of pieces) p.el.remove();
    }
  };
  requestAnimationFrame(tick);
}
