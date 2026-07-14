"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Preload } from "@react-three/drei";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function DataStreams() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport, camera } = useThree();
  const { scrollYProgress } = useScroll();
  const cameraX = useTransform(scrollYProgress, [0, 0.55, 1], [0, -0.85, 1.15]);
  const cameraY = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.55, -0.35]);
  const cameraZ = useTransform(scrollYProgress, [0, 1], [7.2, 3.95]);
  const cameraFov = useTransform(scrollYProgress, [0, 1], [52, 68]);
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, -0.48]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, 2.35]);
  const groupY = useTransform(scrollYProgress, [0, 1], [0, -1.05]);
  const groupScale = useTransform(scrollYProgress, [0, 1], [1, 1.42]);

  const particles = useMemo(() => {
    const positions = new Float32Array(900 * 3);

    for (let i = 0; i < 900; i += 1) {
      const radius = 1.8 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 5.5;
      const index = i * 3;

      positions[index] = Math.cos(angle) * radius;
      positions[index + 1] = height;
      positions[index + 2] = Math.sin(angle) * radius;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollYProgress.get();
    const spinVelocity = 0.055 + scroll * 0.72;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * spinVelocity;
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, scroll * 0.5 + pointer.x * 0.08, 0.065);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, scroll * -0.35 + pointer.y * 0.16, 0.065);
      pointsRef.current.scale.setScalar(THREE.MathUtils.lerp(pointsRef.current.scale.x, 1 + scroll * 0.38, 0.055));
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationX.get() + pointer.y * 0.12, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY.get() + pointer.x * 0.28, 0.06);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pointer.x * viewport.width * 0.045, 0.055);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, groupY.get() + pointer.y * viewport.height * 0.045, 0.055);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, groupScale.get(), 0.055));
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraX.get() + pointer.x * 0.45, 0.055);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraY.get() + pointer.y * 0.28, 0.055);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ.get(), 0.04);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, cameraFov.get(), 0.045);
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, -scroll * 0.55, 0);
    state.gl.setClearColor("#0b0f19", 0);
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f8fafc"
          size={0.024}
          sizeAttenuation
          depthWrite={false}
          opacity={0.72}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0.2, 0, 0]} rotation={[0.7, 0.3, 0.15]}>
          <torusKnotGeometry args={[1.35, 0.006, 180, 16]} />
          <meshBasicMaterial color="#d1d5db" transparent opacity={0.45} />
        </mesh>
      </Float>

      <mesh position={[-1.8, 1.1, -0.8]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[2.2, -0.85, 0.5]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <DataStreams />
        <Preload all />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(11,15,25,0.18),rgba(11,15,25,0.88)_72%)]" />
    </div>
  );
}
