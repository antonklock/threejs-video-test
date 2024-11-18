"use client";

import { Canvas } from "@react-three/fiber";
import { Box } from "./geometry/Box";
import { useEffect, useState } from "react";
import Player from "./Player";

export default function InteractiveVideoPlayer() {
  const [width, setWidth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth / 300);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas>
        <pointLight intensity={1} position={[2, 2, -2]} />
        <pointLight intensity={1} position={[4, -2, -2]} />
        <pointLight intensity={2} position={[4, -4, -4]} />
        <Box />
        <Player size={width} isPlaying={isPlaying} />
      </Canvas>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
