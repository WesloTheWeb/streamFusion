export interface VideoItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    viewCount?: number;
    duration?: string;
    publishedAt?: string;
    source: 'Twitch' | 'YouTube';
};
