export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    source: 'YouTube' | 'Twitch';
    url: string;
    publishedAt: string;
    channelTitle?: string;
    viewCount?: number;
    duration?: string;
};

export interface YouTubeSearchParams {
    query: string;
    maxResults?: number;
    pageToken?: string;
};
