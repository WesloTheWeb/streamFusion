// ? Holds search, videoDetails and format

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSearchParams {
    query: string;
    maxResults?: number;
    pageToken?: string;
};


export const searchYouTube = async ({ query, maxResults = 10, pageToken }: YouTubeSearchParams) => {
    const url = new URL(`${BASE_URL}/search`);

    // ? modifies the url
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', query);
    url.searchParams.append('maxResults', maxResults.toString());
    url.searchParams.append('type', 'video');
    url.searchParams.append('key', API_KEY);

    if (pageToken) {
        url.searchParams.append('pageToken', pageToken);
    };

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('YouTube API request failed');
        };

        // ? Transform data to json
        const data = await response.json();

        // Transform the YouTube response to match our VideoItem interface
        return {
            items: data.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.medium.url,
                channelName: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                source: 'YouTube' as const
            })),
            nextPageToken: data.nextPageToken,
            totalResults: data.pageInfo.totalResults
        };
    } catch (error) {
        console.error('Error fetching from YouTube:', error);
        throw error;
    };
};

// We'll need video details to get duration, view count, etc.
export const getVideoDetails = async (videoIds: string[]) => {
    if (videoIds.length === 0) return { items: [] };

    const url = new URL(`${BASE_URL}/videos`);

    url.searchParams.append('part', 'contentDetails,statistics,snippet');
    url.searchParams.append('id', videoIds.join(','));
    url.searchParams.append('key', API_KEY);

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('YouTube video details request failed');
        };

        return await response.json();
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    };
};

// Helper to convert YouTube duration format (ISO 8601) to human-readable format
export const formatDuration = (duration: string): string => {
    // Remove PT from the beginning
    let formattedDuration = duration.replace('PT', '');

    // Extract hours, minutes and seconds
    const hours = formattedDuration.match(/(\d+)H/);
    const minutes = formattedDuration.match(/(\d+)M/);
    const seconds = formattedDuration.match(/(\d+)S/);

    // Format the duration
    let result = '';

    if (hours) {
        result += `${hours[1]}:`;
    };

    if (minutes) {
        result += hours ? `${minutes[1].padStart(2, '0')}:` : `${minutes[1]}:`;
    } else {
        result += '0:';
    };

    if (seconds) {
        result += `${seconds[1].padStart(2, '0')}`;
    } else {
        result += '00';
    };

    return result;
};