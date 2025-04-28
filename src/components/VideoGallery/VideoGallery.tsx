import VideoPreview from './VideoPreview/VideoPreview';
import classes from './VideoGallery.module.scss';

const { 
  videoGalleryContainer,
  galleryHeader,
  emptyState,
  loadingState,
  twitchHeader,
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
  // Determine if we should use Twitch styling based on the title
  const isTwitchGallery = title.includes('Twitch');
  const headerClasses = `${galleryHeader} ${isTwitchGallery ? twitchHeader : ''}`;
  
  return (
    <section className={videoGalleryContainer}>
      {title && <h2 className={headerClasses}>{title}</h2>}
      
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