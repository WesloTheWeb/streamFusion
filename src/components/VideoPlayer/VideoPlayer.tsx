import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {
  initializeHls,
  isHlsSupported,
  initializeShaka,
  isShakaSupported,
  detectStreamType,
  getSourceType
} from '../../services';
import classes from './VideoPlayer.module.scss';

const {
  'video-player-wrapper': videoPlayerWrapper,
  'video-player': videoPlayer,
  'video-pip-mode': videoPipMode
} = classes;

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  isPip?: boolean;
  onPipToggle?: (isPip: boolean) => void;
  onReady?: (player: any) => void;
};

const VideoPlayer = ({
  src,
  poster,
  title,
  autoplay = false,
  controls = true,
  isPip = false,
  onPipToggle,
  onReady
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current;

      // Detect stream type based on src URL
      const streamType = detectStreamType(src);
      const isHlsSource = streamType === 'hls';
      const isDashSource = streamType === 'dash';

      try {
        // Initialize Video.js player
        playerRef.current = videojs(videoElement, {
          controls,
          autoplay,
          preload: 'auto',
          fluid: true,
          poster: poster,
          sources: [{
            src: src,
            type: getSourceType(streamType)
          }]
        });

        playerRef.current.on('loadeddata', () => {
          setIsLoading(false);
        });

        if (onReady) {
          playerRef.current.ready(() => {
            onReady(playerRef.current);
          });
        };

        if (title) {
          const titleOverlay = document.createElement('div');
          titleOverlay.className = 'vjs-title-overlay';
          titleOverlay.textContent = title;
          playerRef.current.el().appendChild(titleOverlay);
        };

        if (isHlsSource && isHlsSupported()) {
          initializeHls(videoElement, src, setError);
        } else if (isDashSource && isShakaSupported()) {
          initializeShaka(videoElement, src, setError);
        };
      } catch (err) {
        console.error('Error initializing player:', err);
        setError('Failed to initialize video player');
      };
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, controls, autoplay, poster, title, onReady]);

  const togglePip = () => {
    if (onPipToggle) {
      onPipToggle(!isPip);
    };
  };

  return (
    <div className={`${videoPlayerWrapper} ${isPip ? videoPipMode : ''}`}>
      <section className={videoPlayer}>
        {isLoading && (
          <div className={classes['loading-spinner']}>
            <div className={classes.spinner}></div>
          </div>
        )}
        {error && (
          <div className={classes['error-message']}>
            <p>{error}</p>
            <button onClick={() => setError(null)} className={classes['retry-button']}>
              Retry
            </button>
          </div>
        )}
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
          data-setup="{}"
        />
        {isPip && (
          <button
            className={classes['pip-close-button']}
            onClick={togglePip}
            aria-label="Close Picture-in-Picture"
          >
            &times;
          </button>
        )}
      </section>
    </div>
  );
};

export default VideoPlayer;