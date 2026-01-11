import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field for WebGL background
 * Award-winning visual effect with performance optimization
 */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotation
    pointsRef.current.rotation.x = time * 0.05;
    pointsRef.current.rotation.y = time * 0.075;

    // Pulse effect
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/**
 * Floating geometric shapes
 */
function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.1;
    group.current.position.y = Math.sin(time * 0.3) * 0.5;
  });

  return (
    <group ref={group}>
      {/* Teal torus */}
      <mesh position={[-2, 0, -5]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshBasicMaterial color="#14b8a6" wireframe />
      </mesh>

      {/* Yellow box */}
      <mesh position={[2, 1, -5]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="#facc15" wireframe />
      </mesh>

      {/* White sphere */}
      <mesh position={[0, -1, -6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}

interface WebGLBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'bold';
  showShapes?: boolean;
}

/**
 * WebGL Background Component
 *
 * Performance optimized 3D background with particles and shapes
 * Perfect for award-winning visual design
 */
export default function WebGLBackground({
  intensity = 'medium',
  showShapes = false
}: WebGLBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduce motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && containerRef.current) {
      containerRef.current.style.display = 'none';
    }
  }, []);

  const opacity = {
    subtle: 0.3,
    medium: 0.5,
    bold: 0.8
  }[intensity];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Degrade if needed
      >
        {/* Ambient light */}
        <ambientLight intensity={0.5} />

        {/* Particle field */}
        <ParticleField />

        {/* Optional floating shapes */}
        {showShapes && <FloatingShapes />}
      </Canvas>
    </div>
  );
}
