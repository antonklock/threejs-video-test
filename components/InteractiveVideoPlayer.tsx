"use client";

import { Canvas } from "@react-three/fiber";
import { Box } from "./geometry/Box";
import VideoPlane from "./geometry/VideoPlane";
import { useEffect, useState } from "react";

export function Plane() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry />
    </mesh>
  );
}

export default function InteractiveVideoPlayer() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth / 300);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setHeight(width * (9 / 16));
  }, [width]);

  return (
    <div className="w-full h-full">
      <Canvas>
        <pointLight intensity={1} position={[2, 2, -2]} />
        <pointLight intensity={1} position={[4, -2, -2]} />
        <pointLight intensity={2} position={[4, -4, -4]} />
        <Box />
        <VideoPlane width={width} height={height} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
