import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { initializeHls, isHlsSupported, initializeShaka, isShakaSupported, getSourceType, detectStreamType } from '../../services';
import classes from './VideoPlayer.module.scss';

const {
  videoPlayerWrapper,
  videoPlayer,
  videoPipMode,
  loadingSpinner,
  errorMessage,
  retryButton,
  pipCloseButton,
  spinner
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
}

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
  const shakaRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle player errors
  const handleError = (message: string) => {
    console.error(`Player error: ${message}`);
    setError(message);
    setIsLoading(false);
  };

  // Initialize the appropriate player based on stream type
  const initializePlayer = async () => {
    if (!videoRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    const videoElement = videoRef.current;
    const streamType = detectStreamType(src);
    
    console.log(`Initializing player for ${streamType} stream: ${src}`);
    
    try {
      // Make sure video element is properly in the DOM before initializing
      // Add a slight delay to ensure the DOM has time to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Initialize Video.js player
      playerRef.current = videojs(videoElement, {
        controls,
        autoplay,
        preload: 'auto',
        fluid: true,
        poster: poster,
        width: '100%',
        height: 480, // Set a consistent height to match YouTube player
        sources: [{
          src: src,
          type: getSourceType(streamType)
        }]
      });

      playerRef.current.on('loadeddata', () => {
        setIsLoading(false);
      });

      playerRef.current.on('error', () => {
        const error = playerRef.current.error();
        handleError(`Player error: ${error ? error.message : 'Unknown error'}`);
      });

      if (onReady) {
        playerRef.current.ready(() => {
          onReady(playerRef.current);
        });
      }

      if (title) {
        const titleOverlay = document.createElement('div');
        titleOverlay.className = 'vjs-title-overlay';
        titleOverlay.textContent = title;
        playerRef.current.el().appendChild(titleOverlay);
      }

      // For HLS streams, wait for video.js to be fully ready before initializing HLS.js
      if (streamType === 'hls') {
        console.log('Using HLS.js for HLS stream');
        const hlsSupported = await isHlsSupported();
        
        if (hlsSupported) {
          // Make sure the player is fully ready before attaching HLS
          playerRef.current.ready(() => {
            initializeHls(videoElement, src, handleError);
          });
        } else {
          console.log('HLS.js not supported, falling back to native playback');
        }
      }
      // For DASH streams, use Shaka Player if supported
      else if (streamType === 'dash') {
        console.log('Using Shaka Player for DASH stream');
        const shakaSupported = await isShakaSupported();
        
        if (shakaSupported) {
          // Wait for player to be ready
          playerRef.current.ready(() => {
            shakaRef.current = initializeShaka(videoElement, src, handleError);
          });
        } else {
          handleError('DASH playback not supported in this browser');
        }
      }
    } catch (err) {
      console.error('Error initializing player:', err);
      handleError('Failed to initialize video player');
    }
  };

  useEffect(() => {
    initializePlayer();
    
    return () => {
      if (shakaRef.current) {
        try {
          shakaRef.current.destroy();
        } catch (e) {
          console.error('Failed to destroy Shaka player:', e);
        }
        shakaRef.current = null;
      }
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error('Failed to dispose Video.js player:', e);
        }
        playerRef.current = null;
      }
    };
  }, [src, controls, autoplay, poster, title]);

  // Toggle Picture-in-Picture mode
  const togglePip = () => {
    if (onPipToggle) {
      onPipToggle(!isPip);
    }
  };

  // Retry loading the video
  const handleRetry = () => {
    setError(null);
    
    // Clean up existing players
    if (shakaRef.current) {
      try {
        shakaRef.current.destroy();
      } catch (e) {
        console.error('Failed to destroy Shaka player:', e);
      }
      shakaRef.current = null;
    }
    
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
      } catch (e) {
        console.error('Failed to dispose Video.js player:', e);
      }
      playerRef.current = null;
    }
    
    // Reinitialize the player
    setTimeout(initializePlayer, 100);
  };

  return (
    <div className={`${videoPlayerWrapper} ${isPip ? videoPipMode : ''}`}>
      <section className={videoPlayer}>
        {isLoading && (
          <div className={loadingSpinner}>
            <div className={spinner}></div>
          </div>
        )}
        {error && (
          <div className={errorMessage}>
            <p>{error}</p>
            <button onClick={handleRetry} className={retryButton}>
              Retry
            </button>
          </div>
        )}
        <div style={{ height: '480px', width: '100%' }}>
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
            playsInline
            style={{ width: '100%', height: '100%' }}
            data-setup="{}"
          />
        </div>
        {isPip && (
          <button
            className={pipCloseButton}
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