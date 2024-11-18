import React, { useState } from "react";
import { useVideoTexture, Plane } from "@react-three/drei";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";

interface VideoPlaneProps {
  width?: number;
  height?: number;
  position?: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
}

const videoSources = [
  "/video/H1.mp4",
  "/video/H1-A.mp4",
  "/video/H1-B.mp4",
  "/video/H1-C.mp4",
];

const VideoPlane = ({
  width = 16,
  height = 9,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: VideoPlaneProps) => {
  const [textureSource, setTextureSource] = useState(videoSources[0]);
  const texture = useVideoTexture(textureSource);

  const handleClick = () => {
    const nextIndex =
      (videoSources.indexOf(textureSource) + 1) % videoSources.length;
    setTextureSource(videoSources[nextIndex]);
  };

  useFrame(() => {
    texture.needsUpdate = true;
  });

  return (
    <Plane
      onClick={handleClick}
      args={[width, height]}
      position={position}
      rotation={rotation}
    >
      <meshBasicMaterial map={texture} toneMapped={false} />
    </Plane>
  );
};

export default VideoPlane;
