import VideoPreview from './VideoPreview/VideoPreview';
import classes from './VideoGallery.module.scss';

const { 
  videoGalleryContainer,
  galleryHeader,
  emptyState,
  loadingState
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
  return (
    <section className={videoGalleryContainer}>
      {title && <h2 className={galleryHeader}>{title}</h2>}
      
      {isLoading ? (
        <div className={loadingState}>Loading videos...</div>
      ) : videos.length === 0 ? (
        <div className={emptyState}>No videos found. Try a different search.</div>
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