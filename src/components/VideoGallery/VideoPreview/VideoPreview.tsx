import { formatDistanceToNow } from 'date-fns';
import classes from './VideoPreview.module.scss';

const {
  videoPreviewContainer,
  thumbnailContainer,
  thumbnail,
  duration,
  sourceBadge,
  twitchBadge,
  youtubeBadge,
  videoInfo,
  videoTitle,
  channelName,
  videoMetadata,
  viewCount: viewCountClass,
  publishedAt: publishedAtClass
} = classes;

interface VideoPreviewProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  viewCount?: number;
  duration?: string;
  publishedAt?: string;
  source: 'Twitch' | 'YouTube';
  onSelect: (id: string, source: 'Twitch' | 'YouTube') => void;
};

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

  return (
    <article
      className={videoPreviewContainer}
      onClick={() => onSelect(id, source)}
    >
      <figure className={thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={title}
          className={thumbnail}
        />
        {duration && <span className={duration}>{duration}</span>}
        <span className={`${sourceBadge} ${source === 'Twitch' ? twitchBadge : youtubeBadge}`}>
          {source}
        </span>
      </figure>
      <section className={videoInfo}>
        <h3 className={videoTitle}>{title}</h3>
        <p className={channelName}>{channelName}</p>
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