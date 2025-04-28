import VideoPreview from './VideoPreview/VideoPreview';
import classes from './VideoGallery.module.scss';

const {
  videoGalleryContainer,
  galleryHeader,
  youtubeHeader,
  twitchHeader,
  headerText,
  emptyState,
  loadingState,
  spinner
} = classes;

interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  viewCount?: number;
  duration?: string;
  publishedAt?: string;
  source: 'Twitch' | 'YouTube';
}

interface VideoGalleryProps {
  videos: VideoItem[];
  title?: string;
  isLoading?: boolean;
  onVideoSelect: (id: string, source: 'Twitch' | 'YouTube') => void;
}

const VideoGallery = ({
  videos,
  title = 'Video Gallery',
  isLoading = false,
  onVideoSelect
}: VideoGalleryProps) => {
  // Determine if we should use Twitch or YouTube styling based on the title
  const isTwitchGallery = title.includes('Twitch');
  const isYouTubeGallery = title.includes('YouTube');

  // Set header classes based on the platform
  const headerClasses = `${galleryHeader} ${isTwitchGallery ? twitchHeader : ''} ${isYouTubeGallery ? youtubeHeader : ''}`;

  // Return proper platform SVG logo based on which gallery we're showing
  const renderLogo = () => {
    if (isYouTubeGallery) {
      return (
        <svg height="24px" width="24px" viewBox="0 0 461.001 461.001" fill="#FFFFFF">
          <g>
            <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
              c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
              C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
              c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z" />
          </g>
        </svg>
      );
    } else if (isTwitchGallery) {
      return (
        <svg viewBox="0 0 16 16" height="24px" width="24px" fill="none">
          <path fill="#ffffff" d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"></path>
          <g fill="#9146FF">
            <path d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"></path>
            <path d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z"></path>
          </g>
        </svg>
      );
    }

    return null;
  };

  return (
    <section className={videoGalleryContainer}>
      {title && (
        <h2 className={headerClasses}>
          {renderLogo()}
          <span className={headerText}>{title}</span>
        </h2>
      )}

      {isLoading ? (
        <div className={loadingState}>
          <div className={spinner}></div>
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className={emptyState}>
          <p>No videos found. Try a different search.</p>
        </div>
      ) : (
        videos.map(video => (
          <VideoPreview
            key={`${video.source}-${video.id}`}
            id={video.id}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            channelName={video.channelName}
            viewCount={video.viewCount}
            duration={video.duration}
            publishedAt={video.publishedAt}
            source={video.source}
            onSelect={onVideoSelect}
          />
        ))
      )}
    </section>
  );
};

export default VideoGallery;