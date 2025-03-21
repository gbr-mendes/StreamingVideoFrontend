import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const VideoCatalog = () => {
  const [videos, setVideos] = useState([]);

  const fetchIndexedVideos = async () => {
    try {
      const response = await fetch("https://localhost:7188/api/indexed-videos");
      if (!response.ok) {
        console.error("Error while fetching indexed videos");
        return;
      }
      const videos = await response.json();
      setVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchIndexedVideos();
    const intervalId = setInterval(fetchIndexedVideos, 60000); // 1 minuto

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Meus Vídeos</h1>
      <div className="row">
        {videos.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
};

export default VideoCatalog;
