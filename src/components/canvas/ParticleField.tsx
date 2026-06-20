"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

function Particles({ positions }: { positions: Float32Array }) {
  const ref = useRef<ThreePoints>(null);

  useFrame(({ pointer }) => {
    const mesh = ref.current;
    if (!mesh) return;
    // Drift rotation toward pointer — gentle parallax.
    mesh.rotation.x += (pointer.y * 0.12 - mesh.rotation.x) * 0.04;
    mesh.rotation.y += (pointer.x * 0.12 - mesh.rotation.y) * 0.04;
    mesh.rotation.z += 0.0004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#e8ff47"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function makePositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 20;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  return arr;
}

/**
 * Three.js particle background. Particle count drops on small screens and is
 * skipped under reduced motion. Dynamic/lazy-import this from sections so it
 * never blocks first paint.
 */
export default function ParticleField() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const count = window.innerWidth < 768 ? 800 : 2000;
    // One-time client measurement → build the field.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(makePositions(count));
  }, []);

  if (!positions) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Particles positions={positions} />
      </Canvas>
    </div>
  );
}
