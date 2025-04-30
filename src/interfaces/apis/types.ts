export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    source: 'YouTube' | 'Twitch' | 'Demo';
    url: string;
    publishedAt: string;
    channelTitle?: string;
    viewCount?: number;
    duration?: string;
    streamUrl?: string;
    streamType?: string;

};

export interface YouTubeSearchParams {
    query: string;
    maxResults?: number;
    pageToken?: string;
};
