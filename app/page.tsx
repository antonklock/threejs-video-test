"use client";

import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";
import { useState } from "react";

export default function Home() {
  const [startGame, setStartGame] = useState(false);
  const [useStream, setUseStream] = useState(false);

  const handleStartGame = () => {
    setStartGame(!startGame);
  };

  return (
    <div className="w-full h-screen">
      {startGame ? (
        <div className="w-full h-screen">
          <InteractiveVideoPlayer />
          <button
            onClick={handleStartGame}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition-colors duration-200"
          >
            Stop Game
          </button>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition-colors duration-200"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
