import { useEffect, useRef } from 'react';
import classes from '../VideoPlayer/VideoPlayer.module.scss';

const {
  'video-player-wrapper': videoPlayerWrapper,
  'video-player': videoPlayer,
} = classes;

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  title?: string;
}

const YouTubePlayer = ({ videoId, autoplay = false, title }: YouTubePlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // When the videoId changes, we need to update the iframe src
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`;
    }
  }, [videoId, autoplay]);

  return (
    <div className={videoPlayerWrapper}>
      {title && <h2 className={classes['video-title']}>{title}</h2>}
      <div className={videoPlayer}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubePlayer;