import React, { useState, useRef } from "react";

const cardStyle = {
  transition: '0.3s',
  cursor: 'pointer',
};

const cardHoverStyle = {
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  border: '2px solid #007bff',
  backgroundColor: 'rgba(237, 226, 226, 0.7)',
};

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  const videoUrl = `http://192.168.0.103:5179/api/videos/${video.id}`; // Ajuste a URL do backend conforme necessário

  const background = video.thumbnailUrl
    ? `url(${video.thumbnailUrl}) center/cover`
    : isHovered
    ? 'rgba(0, 0, 0, 0.7)'
    : '#343a40';

  const openFullscreen = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }

      setIsFullscreen(true);
    }
  };

  const togglePlayPause = () => {
    if (!isLoaded) {
      videoRef.current.src = videoUrl;
      setIsLoaded(true);
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card text-white"
        style={{
          ...cardStyle,
          ...(isHovered ? cardHoverStyle : {}),
          background,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openFullscreen}
      >
        <div className="card-body" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <h5 className="card-title">{video.name}</h5>
          {video.description && <p className="card-text">{video.description}</p>}
          <p className="card-text">Size: {(video.size / (1024 * 1024)).toFixed(2)} MB</p>

          <video
            ref={videoRef}
            width="100%"
            controls
            style={{ display: isFullscreen ? 'block' : 'none' }}
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>

          {/* Controle do vídeo (se não estiver em tela cheia) */}
          {!isFullscreen && (
            <div className="video-controls">
              <button onClick={togglePlayPause}>Play/Pause</button>
              <button onClick={skipBackward}>-10s</button>
              <button onClick={skipForward}>+10s</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;