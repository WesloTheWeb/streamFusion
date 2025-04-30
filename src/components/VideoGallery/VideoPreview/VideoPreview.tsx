import { formatDistanceToNow } from 'date-fns';
import { VideoSource } from '../../../interfaces';
import classes from './VideoPreview.module.scss';

const {
  videoPreviewContainer,
  thumbnailContainer,
  thumbnail,
  durationTag,
  sourceBadge,
  twitchBadge,
  youtubeBadge,
  demoBadge,
  videoInfo,
  videoTitle,
  videoChannelName,
  videoMetadata,
  viewCount: viewCountClass,
  publishedAt: publishedAtClass,
  twitchVideo,
  youtubeVideo,
} = classes;

interface VideoPreviewProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  viewCount?: number;
  duration?: string;
  publishedAt?: string;
  source: VideoSource;
  onSelect: (id: string, source: VideoSource) => void;
}

const VideoPreview = ({
  id,
  title,
  thumbnailUrl,
  channelName,
  viewCount,
  duration,
  publishedAt,
  source,
  onSelect
}: VideoPreviewProps) => {
  const formatViews = (count?: number) => {
    if (!count) return '';
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const formattedDate = publishedAt
    ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true })
    : '';

  const truncatedAltText = title.length > 60 ? `${title.substring(0, 60)}...` : title;
  
  const getSourceContainerClass = () => {
    if (source === 'Twitch') return twitchVideo;
    if (source === 'YouTube') return youtubeVideo;
    return ''; // Default or for Demo
  };
  
  const getSourceBadgeClass = () => {
    if (source === 'Twitch') return twitchBadge;
    if (source === 'YouTube') return youtubeBadge;
    if (source === 'Demo') return demoBadge;
    return '';
  };
  
  const modeContainerClass = `${videoPreviewContainer} ${getSourceContainerClass()}`;

  return (
    <article
      className={modeContainerClass}
      onClick={() => onSelect(id, source)}
    >
      <figure className={thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={truncatedAltText}
          className={thumbnail}
        />
        {duration && <span className={durationTag}>{duration}</span>}
        <span className={`${sourceBadge} ${getSourceBadgeClass()}`}>
          {source}
        </span>
      </figure>
      <section className={videoInfo}>
        <h3 className={videoTitle}>{title}</h3>
        <p className={videoChannelName}>{channelName}</p>
        <footer className={videoMetadata}>
          {viewCount !== undefined && (
            <span className={viewCountClass}>{formatViews(viewCount)} views</span>
          )}
          {publishedAt && (
            <span className={publishedAtClass}>{formattedDate}</span>
          )}
        </footer>
      </section>
    </article>
  );
};

export default VideoPreview;