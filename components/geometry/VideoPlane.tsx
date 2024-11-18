import React from "react";
import { Plane } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { VideoTexture } from "three";

interface VideoPlaneProps {
  width?: number;
  height?: number;
  position?: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
  videoTexture: VideoTexture | null;
  handleClick: () => void;
}

const VideoPlane = (props: VideoPlaneProps) => {
  const {
    width = 16,
    height = 9,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    videoTexture,
    handleClick,
  } = props;

  return (
    <>
      {videoTexture ? (
        <Plane
          onClick={handleClick}
          args={[width, height]}
          position={position}
          rotation={rotation}
        >
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </Plane>
      ) : (
        <></>
      )}
    </>
  );
};

export default VideoPlane;
