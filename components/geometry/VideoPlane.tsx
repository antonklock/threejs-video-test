import React, { useState, useEffect, useRef } from "react";
import { Plane } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import Hls from "hls.js";

interface VideoPlaneProps {
  width?: number;
  height?: number;
  position?: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
  useStream?: boolean;
}

const videoSources = [
  "/video/H1.mp4",
  "/video/H1-A.mp4",
  "/video/H1-B.mp4",
  "/video/H1-C.mp4",
];

const streamVideoSources = [
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8",
];

const VideoPlane = (props: VideoPlaneProps) => {
  const {
    width = 16,
    height = 9,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    useStream = false,
  } = props;

  const [textureSource, setTextureSource] = useState(
    useStream ? streamVideoSources[0] : videoSources[0]
  );
  const videoRef = useRef<HTMLVideoElement>();
  const hlsRef = useRef<Hls>();
  const textureRef = useRef<THREE.VideoTexture>();
  const [texture, setTexture] = useState<THREE.VideoTexture>();

  useEffect(() => {
    videoRef.current = document.createElement("video");
    videoRef.current.playsInline = true;
    videoRef.current.muted = true;
    videoRef.current.loop = true;

    return () => {
      hlsRef.current?.destroy();
      videoRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const loadVideo = async () => {
      if (useStream) {
        // Clean up previous HLS instance
        hlsRef.current?.destroy();

        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;
          hls.attachMedia(videoRef.current as HTMLMediaElement);
          hls.loadSource(textureSource);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current?.play();
          });
        } else if (
          videoRef.current &&
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          // Safari fallback
          videoRef.current.src = textureSource;
          videoRef.current.play();
        }
      } else if (videoRef.current) {
        // Regular video
        videoRef.current.src = textureSource;
        videoRef.current.play();
      }

      // Create new texture
      const newTexture = new THREE.VideoTexture(
        videoRef.current as HTMLVideoElement
      );
      newTexture.minFilter = THREE.LinearFilter;
      newTexture.magFilter = THREE.LinearFilter;
      textureRef.current = newTexture;
      setTexture(newTexture);
    };

    loadVideo();
  }, [textureSource, useStream]);

  const handleClick = () => {
    const sources = useStream ? streamVideoSources : videoSources;
    const nextIndex = (sources.indexOf(textureSource) + 1) % sources.length;
    setTextureSource(sources[nextIndex]);

    console.log("textureSource", textureSource);
  };

  if (!texture) return null;

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

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// import React, { useState, useEffect } from "react";
// import { useVideoTexture, Plane } from "@react-three/drei";
// import { Euler, useFrame, Vector3 } from "@react-three/fiber";

// interface VideoPlaneProps {
//   width?: number;
//   height?: number;
//   position?: Vector3 | [number, number, number];
//   rotation?: Euler | [number, number, number];
//   useStream?: boolean;
// }

// const videoSources = [
//   "/video/H1.mp4",
//   "/video/H1-A.mp4",
//   "/video/H1-B.mp4",
//   "/video/H1-C.mp4",
// ];

// const streamVideoSources = [
//   "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8",
//   "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8",
//   "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
//   "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8",
// ];

// const VideoPlane = (props: VideoPlaneProps) => {
//   const {
//     width = 16,
//     height = 9,
//     position = [0, 0, 0],
//     rotation = [0, 0, 0],
//     useStream = false,
//   } = props;

//   const [textureSource, setTextureSource] = useState(
//     useStream ? streamVideoSources[0] : videoSources[0]
//   );
//   const texture = useVideoTexture(textureSource);

//   useEffect(() => {
//     setTextureSource(useStream ? streamVideoSources[0] : videoSources[0]);
//   }, [useStream]);

//   const handleClick = () => {
//     const sources = useStream ? streamVideoSources : videoSources;
//     const nextIndex = (sources.indexOf(textureSource) + 1) % sources.length;
//     setTextureSource(sources[nextIndex]);

//     console.log("textureSource", textureSource);
//   };

//   useFrame(() => {
//     texture.needsUpdate = true;
//   });

//   return (
//     <Plane
//       onClick={handleClick}
//       args={[width, height]}
//       position={position}
//       rotation={rotation}
//     >
//       <meshBasicMaterial map={texture} toneMapped={false} />
//     </Plane>
//   );
// };

// export default VideoPlane;
