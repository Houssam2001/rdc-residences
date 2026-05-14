"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Wireframe House ─── */
function WireframeHouse({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const houseEdges = useMemo(() => {
    const vertices: [number, number, number][] = [];

    // Base rectangle (floor)
    vertices.push([-1.5, 0, -1], [1.5, 0, -1]);
    vertices.push([1.5, 0, -1], [1.5, 0, 1]);
    vertices.push([1.5, 0, 1], [-1.5, 0, 1]);
    vertices.push([-1.5, 0, 1], [-1.5, 0, -1]);

    // Top rectangle (ceiling)
    vertices.push([-1.5, 1.8, -1], [1.5, 1.8, -1]);
    vertices.push([1.5, 1.8, -1], [1.5, 1.8, 1]);
    vertices.push([1.5, 1.8, 1], [-1.5, 1.8, 1]);
    vertices.push([-1.5, 1.8, 1], [-1.5, 1.8, -1]);

    // Vertical pillars
    vertices.push([-1.5, 0, -1], [-1.5, 1.8, -1]);
    vertices.push([1.5, 0, -1], [1.5, 1.8, -1]);
    vertices.push([1.5, 0, 1], [1.5, 1.8, 1]);
    vertices.push([-1.5, 0, 1], [-1.5, 1.8, 1]);

    // Roof ridge
    vertices.push([-1.5, 1.8, -1], [0, 2.8, -1]);
    vertices.push([0, 2.8, -1], [1.5, 1.8, -1]);
    vertices.push([-1.5, 1.8, 1], [0, 2.8, 1]);
    vertices.push([0, 2.8, 1], [1.5, 1.8, 1]);
    vertices.push([0, 2.8, -1], [0, 2.8, 1]);

    // Door frame
    vertices.push([-0.4, 0, 1.01], [-0.4, 1.2, 1.01]);
    vertices.push([-0.4, 1.2, 1.01], [0.4, 1.2, 1.01]);
    vertices.push([0.4, 1.2, 1.01], [0.4, 0, 1.01]);

    // Window left
    vertices.push([-1.2, 0.6, 1.01], [-1.2, 1.2, 1.01]);
    vertices.push([-1.2, 1.2, 1.01], [-0.7, 1.2, 1.01]);
    vertices.push([-0.7, 1.2, 1.01], [-0.7, 0.6, 1.01]);
    vertices.push([-0.7, 0.6, 1.01], [-1.2, 0.6, 1.01]);

    // Window right
    vertices.push([0.7, 0.6, 1.01], [0.7, 1.2, 1.01]);
    vertices.push([0.7, 1.2, 1.01], [1.2, 1.2, 1.01]);
    vertices.push([1.2, 1.2, 1.01], [1.2, 0.6, 1.01]);
    vertices.push([1.2, 0.6, 1.01], [0.7, 0.6, 1.01]);

    return new Float32Array(vertices.flat());
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 + mouseX * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05 + mouseY * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[houseEdges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1a1a1a" transparent opacity={0.12} linewidth={1} />
      </lineSegments>
    </group>
  );
}

/* ─── Blueprint Grid ─── */
function BlueprintGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const gridVertices = useMemo(() => {
    const verts: number[] = [];
    const size = 6;
    const divisions = 20;
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      const pos = -size / 2 + i * step;
      verts.push(-size / 2, 0, pos, size / 2, 0, pos);
      verts.push(pos, 0, -size / 2, pos, 0, size / 2);
    }
    return new Float32Array(verts);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.2) * 0.05;
    groupRef.current.position.y = -1.5 + Math.sin(t * 0.3) * 0.1;
    groupRef.current.rotation.z = t * 0.02;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridVertices, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#c8b89a" transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

/* ─── Floating Particles ─── */
function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#1a1a1a" size={0.015} transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

/* ─── Measurement Lines ─── */
function MeasurementLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lineVerts = useMemo(() => {
    return new Float32Array([
      -2, -0.5, 2, 2, -0.5, 2,
      -2, -0.7, 2, -2, -0.3, 2,
      2, -0.7, 2, 2, -0.3, 2,
      2.5, 0, 1, 2.5, 2.8, 1,
      2.3, 0, 1, 2.7, 0, 1,
      2.3, 2.8, 1, 2.7, 2.8, 1,
    ]);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1a1a1a" transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

/* ─── Main Scene ─── */
export default function ArchitectureSceneLight({
  mouseX = 0,
  mouseY = 0,
}: {
  mouseX?: number;
  mouseY?: number;
}) {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <WireframeHouse mouseX={mouseX} mouseY={mouseY} />
        <BlueprintGrid />
        <MeasurementLines />
        <FloatingParticles count={100} />
      </Canvas>
    </div>
  );
}
