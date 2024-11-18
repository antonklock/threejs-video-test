"use client";

import { Canvas } from "@react-three/fiber";
import { Box } from "./geometry/Box";
// import VideoPlane from "./geometry/VideoPlane";
import { useEffect, useState } from "react";
import VideoStatus from "./VideoStatus";

export function Plane() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry />
    </mesh>
  );
}

export default function InteractiveVideoPlayer(props: { useStream: boolean }) {
  const { useStream } = props;
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
    console.log("height:", height);
    console.log("useStream:", useStream);
  }, [width]);

  return (
    <div className="w-full h-full">
      <Canvas>
        <pointLight intensity={1} position={[2, 2, -2]} />
        <pointLight intensity={1} position={[4, -2, -2]} />
        <pointLight intensity={2} position={[4, -4, -4]} />
        <Box />
        {/* <VideoPlane
          width={width}
          height={height}
          position={[0, 0, 0]}
          useStream={useStream}
        /> */}
      </Canvas>
      <VideoStatus />
    </div>
  );
}
