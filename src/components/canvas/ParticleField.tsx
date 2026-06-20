"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

function Particles({ count }: { count: number }) {
  const ref = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
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

/**
 * Three.js particle background. Particle count drops on small screens. Skipped
 * entirely under reduced motion. Lazy/dynamic-import this from sections.
 */
export default function ParticleField() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setCount(0);
      return;
    }
    setCount(window.innerWidth < 768 ? 800 : 2000);
  }, []);

  if (count === 0) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
