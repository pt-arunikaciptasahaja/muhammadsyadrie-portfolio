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
    const isMobile = size.width < 768;
    const pointerSensitivity = isMobile ? 1.55 : 1;
    const scrollSensitivity = isMobile ? 1.35 : 1;
    const motionResponse = isMobile ? 1.22 : 1;
    const pointerX = state.pointer.x * pointerSensitivity;
    const pointerY = state.pointer.y * pointerSensitivity;
    const hoverFloat = Math.sin(state.clock.elapsedTime * 1.18);
    const hoverDrift = Math.cos(state.clock.elapsedTime * 0.82);
    const scrollSpin = scroll * Math.PI * 4 * scrollSensitivity;
    const magnet = isHovering ? 1 : 0;
    const targetRotationX =
      THREE.MathUtils.clamp(pointerY * -0.24, -0.28, 0.28) + Math.sin(scroll * Math.PI * scrollSensitivity) * 0.16 + magnet * pointerY * -0.08 + hoverFloat * 0.025;
    const targetRotationY = scrollSpin + THREE.MathUtils.clamp(pointerX * 0.34, -0.4, 0.4) + magnet * pointerX * 0.16 + hoverDrift * 0.018;
    const targetRotationZ = scroll * -0.42 * scrollSensitivity + pointerX * -0.035 + magnet * pointerX * -0.05 + hoverFloat * 0.012;
    const mobileScale = isMobile ? 0.68 : 1;
    const targetScale = THREE.MathUtils.lerp(1, 0.62, THREE.MathUtils.clamp(scroll * 1.15, 0, 1)) * mobileScale * (1 + hoverDrift * 0.008);
    const targetX = magnet * pointerX * 0.32 + hoverDrift * 0.035;
    const targetY =
      THREE.MathUtils.lerp(isMobile ? 0.42 : 0, 1.85, THREE.MathUtils.clamp(scroll * 1.1 * scrollSensitivity, 0, 1)) +
      magnet * pointerY * 0.18 +
      hoverFloat * 0.085;
    const targetZ = THREE.MathUtils.lerp(0, -0.85, THREE.MathUtils.clamp(scroll, 0, 1));
    const jelly = magnet * (0.04 + Math.abs(pointerX) * 0.035);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.07 * motionResponse);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.085 * motionResponse);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.06 * motionResponse);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, (isHovering ? 0.105 : 0.055) * motionResponse);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, (isHovering ? 0.105 : 0.065) * motionResponse);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ + magnet * 0.18, 0.065 * motionResponse);
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale * (1 + jelly), 0.085 * motionResponse);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale * (1 - jelly * 0.55), 0.085 * motionResponse);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale * (1 + jelly * 0.35), 0.085 * motionResponse);
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
            <meshBasicMaterial color="#fcffda" transparent opacity={0.16} depthWrite={false} />
          </Text3D>
          <Text3D {...text3DProps} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
            build.
            <meshPhysicalMaterial
              color="#fcffda"
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
        <color attach="background" args={["#1a1f47"]} />
        <ambientLight intensity={0.58} />
        <directionalLight position={[3.5, 3.5, 4]} intensity={1.7} color="#fcffda" />
        <pointLight position={[-3, -1.5, 3]} intensity={1.35} color="#6170bb" />
        <pointLight position={[2.4, 1.8, 2.2]} intensity={1.8} color="#ff594a" />
        <pointLight position={[0, 0, 1.65]} intensity={0.7} color="#fff4d3" />
        <InteractiveText scrollYProgress={scrollYProgress} />
        <Environment preset="studio" background={false} environmentIntensity={0.45} />
        <Preload all />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(252,255,218,0.1),rgba(20,63,153,0.42)_38%,rgba(26,31,71,0.94)_78%)]" />
    </div>
  );
}
