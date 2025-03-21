import React from "react";

const cardStyle = {
    transition: '0.3s',
    cursor: 'pointer',
  };
  
  const cardHoverStyle = {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    border: '2px solid #007bff',
    backgroundColor: 'rgba(237, 226, 226, 0.7)',
  };

const formatDuration = (duration) => {
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = Math.floor(parseFloat(parts[2]));
  
    let result = [];
    if (hours > 0) result.push(`${hours}h`);
    if (minutes > 0) result.push(`${minutes}m`);
    if (seconds > 0 || result.length === 0) result.push(`${seconds}s`);
  
    return result.join(' ');
  };

const truncateText = (text, maxLength = 100) => {
    if (!text) return null;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = React.useState(false);
  
    const background = video.thumbnailUrl 
      ? `url(${video.thumbnailUrl}) center/cover` 
      : isHovered 
        ? 'rgba(0, 0, 0, 0.7)' 
        : '#343a40';
  
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
        >
          <div className="card-body" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <h5 className="card-title">{video.name}</h5>
            {video.description && <p className="card-text">{truncateText(video.description, 100)}</p>}
            <p className="card-text">Duration: {formatDuration(video.duration)}</p>
            <p className="card-text">Size: {(video.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        </div>
      </div>
    );
  };

export default VideoCard