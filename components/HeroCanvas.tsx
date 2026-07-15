"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Preload, Text3D } from "@react-three/drei";
import { MotionValue, useScroll } from "framer-motion";
import * as THREE from "three";

const text3DProps = {
  font: "/fonts/helvetiker_bold.typeface.json",
  size: 1.62,
  height: 0.34,
  curveSegments: 16,
  bevelEnabled: true,
  bevelSize: 0.052,
  bevelThickness: 0.095,
  bevelSegments: 5,
  letterSpacing: -0.045
} as const;

type InteractiveTextProps = {
  scrollYProgress: MotionValue<number>;
};

function InteractiveText({ scrollYProgress }: InteractiveTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isHoveringRef = useRef(false);
  const { size } = useThree();

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const scroll = scrollYProgress.get();
    const isHovering = isHoveringRef.current;
    const scrollSpin = scroll * Math.PI * 4;
    const magnet = isHovering ? 1 : 0;
    const targetRotationX =
      THREE.MathUtils.clamp(state.pointer.y * -0.24, -0.22, 0.22) + Math.sin(scroll * Math.PI) * 0.16 + magnet * state.pointer.y * -0.08;
    const targetRotationY = scrollSpin + THREE.MathUtils.clamp(state.pointer.x * 0.34, -0.32, 0.32) + magnet * state.pointer.x * 0.16;
    const targetRotationZ = scroll * -0.42 + state.pointer.x * -0.035 + magnet * state.pointer.x * -0.05;
    const isMobile = size.width < 768;
    const mobileScale = isMobile ? 0.56 : 1;
    const targetScale = THREE.MathUtils.lerp(1, 0.62, THREE.MathUtils.clamp(scroll * 1.15, 0, 1)) * mobileScale;
    const targetX = magnet * state.pointer.x * 0.32;
    const targetY = THREE.MathUtils.lerp(isMobile ? 0.42 : 0, 1.85, THREE.MathUtils.clamp(scroll * 1.1, 0, 1)) + magnet * state.pointer.y * 0.18;
    const targetZ = THREE.MathUtils.lerp(0, -0.85, THREE.MathUtils.clamp(scroll, 0, 1));
    const jelly = magnet * (0.04 + Math.abs(state.pointer.x) * 0.035);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.07);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.085);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.06);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, isHovering ? 0.105 : 0.055);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, isHovering ? 0.105 : 0.065);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ + magnet * 0.18, 0.065);
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale * (1 + jelly), 0.085);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale * (1 - jelly * 0.55), 0.085);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale * (1 + jelly * 0.35), 0.085);
  });

  const handlePointerOver = () => {
    isHoveringRef.current = true;
    document.documentElement.style.cursor = "grab";
  };

  const handlePointerOut = () => {
    isHoveringRef.current = false;
    document.documentElement.style.cursor = "";
  };

  return (
    <group ref={groupRef}>
      <Center>
        <group>
          <Text3D
            {...text3DProps}
            position={[0.035, -0.035, -0.085]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            build.
            <meshBasicMaterial color="#f8fafc" transparent opacity={0.12} depthWrite={false} />
          </Text3D>
          <Text3D {...text3DProps} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
            build.
            <meshPhysicalMaterial
              color="#f8fafc"
              roughness={0.18}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.22}
              transmission={0}
              transparent
              opacity={0.88}
              envMapIntensity={0.48}
              reflectivity={0.32}
            />
          </Text3D>
        </group>
      </Center>
    </group>
  );
}

export function HeroCanvas() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-x-0 top-0 z-0 h-[52svh] w-full overflow-hidden sm:h-screen">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b0f19"]} />
        <ambientLight intensity={0.58} />
        <directionalLight position={[3.5, 3.5, 4]} intensity={1.7} color="#f8fafc" />
        <pointLight position={[-3, -1.5, 3]} intensity={1.35} color="#94a3b8" />
        <pointLight position={[2.4, 1.8, 2.2]} intensity={1.8} color="#f8fafc" />
        <pointLight position={[0, 0, 1.65]} intensity={0.7} color="#ffffff" />
        <InteractiveText scrollYProgress={scrollYProgress} />
        <Environment preset="studio" background={false} environmentIntensity={0.45} />
        <Preload all />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(248,250,252,0.08),rgba(11,15,25,0.42)_38%,rgba(11,15,25,0.92)_78%)]" />
    </div>
  );
}
