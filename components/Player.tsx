import React, { useState } from "react";
import VideoPlane from "./geometry/VideoPlane";
import { useVideoTexture } from "@react-three/drei";

const streamVideoSources = [
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
];

const Player = (props: { size: number; isPlaying: boolean }) => {
  const { size } = props;
  const width = size;
  const height = size * (9 / 16);

  //   const [videoElements] = useState(() =>
  //     streamVideoSources.map((src, index) => {
  //       const vid = document.createElement("video");
  //       vid.crossOrigin = "Anonymous";
  //       vid.loop = true;
  //       vid.muted = true;
  //       vid.id = `video-${index + 1}`;
  //       return vid;
  //     })
  //   );

  //   const [videoTextures] = useState(() =>
  //     videoElements.map((element) => new VideoTexture(element))
  //   );

  //   const [activeVideoTexture, setActiveVideoTexture] = useState(
  //     videoTextures[0]
  //   );
  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   useEffect(() => {
  //     if (isPlaying) {
  //       videoElements[currentIndex].play().catch(console.error);
  //     } else {
  //       videoElements[currentIndex].pause();
  //     }
  //   }, [isPlaying]);

  //   useEffect(() => {
  //     videoElements.forEach((element, index) => {
  //       if (Hls.isSupported()) {
  //         const hls = new Hls();
  //         hls.loadSource(streamVideoSources[index]);
  //         hls.attachMedia(element);

  //         hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //           //   element.play().catch(console.error);
  //         });
  //       }
  //     });

  //     return () => {
  //       videoElements.forEach((element) => {
  //         element.pause();
  //         element.src = "";
  //       });
  //     };
  //   }, []);

  //   const handleClick = () => {
  //     const nextIndex = (currentIndex + 1) % streamVideoSources.length;
  //     setCurrentIndex(nextIndex);
  //     setActiveVideoTexture(videoTextures[nextIndex]);
  //     videoElements[nextIndex].play().catch(console.error);

  //     videoElements.forEach((element, idx) => {
  //       if (idx !== nextIndex) {
  //         element.pause();
  //         element.currentTime = 0;
  //       }
  //     });
  //   };

  const texture1 = useVideoTexture(streamVideoSources[0]);
  const texture2 = useVideoTexture(streamVideoSources[1]);
  const texture3 = useVideoTexture(streamVideoSources[2]);

  const videoTextures = [texture1, texture2, texture3];

  const [activeVideoTexture, setActiveVideoTexture] = useState(texture1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % streamVideoSources.length;
    setCurrentIndex(nextIndex);
    setActiveVideoTexture(videoTextures[nextIndex]);
  };

  return (
    <VideoPlane
      width={width}
      height={height}
      videoTexture={activeVideoTexture}
      handleClick={handleClick}
    />
  );
};

export default Player;
