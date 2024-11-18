import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export function Box() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh position={[4, 0, -3]} ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
