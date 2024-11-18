import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";

const streamUrls = [
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/51cb3c8b7aec89d2df5aa95981c2a7c0/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/36597fa6c0bf1a5820b712e1e832cf8f/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/30cbfd2e855a15fc730e5b47553dc726/manifest/video.m3u8",
  "https://customer-8b2ok7c97mpbuf67.cloudflarestream.com/862fd9f600910ac44835de3033d851b4/manifest/video.m3u8",
];

const getStatusColor = (state: string) => {
  if (state === "not-loaded") return "bg-red-500";
  if (state === "loading") return "bg-yellow-500";
  return "bg-green-500";
};

const VideoStatus = () => {
  const [status, setStatus] = useState(Array(4).fill("not-loaded"));
  const hlsInstances = useRef<Hls[]>([]);

  useEffect(() => {
    const instances: Hls[] = [];
    streamUrls.forEach((url, index) => initializeStream(url, index, instances));

    return () => {
      instances.forEach((hls) => hls?.destroy());
    };
  }, []);

  const initializeStream = (url: string, index: number, instances: Hls[]) => {
    setStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = "loading";
      return newStatus;
    });

    const video = document.createElement("video");
    video.muted = true;

    if (Hls.isSupported()) {
      const hls = new Hls();
      instances[index] = hls;
      hlsInstances.current[index] = hls;
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => updateStatus(index, "ready"));

      hls.loadSource(url);
    }
  };

  const updateStatus = (index: number, newState: string) => {
    setStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = newState;
      return newStatus;
    });
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      {status.map((state, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full ${getStatusColor(state)}`}
        />
      ))}
    </div>
  );
};

export default VideoStatus;
