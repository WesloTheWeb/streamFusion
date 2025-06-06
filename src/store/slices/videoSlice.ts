import { RootState } from '../index';
import { Video } from '../../interfaces';
import { getDemoVideos } from '../../config/demoVideoStreams/DemoVideoStreams';
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { searchYouTube, getVideoDetails, formatDuration } from '../../services/YouTubeService/youtubeService';

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  error: string | null;
  nextPageToken?: string;
  totalResults?: number;
};

const initialState: VideoState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
  nextPageToken: undefined,
  totalResults: 0,
};

export const fetchYouTubeVideos = createAsyncThunk(
  'videos/fetchYouTubeVideos',
  async ({ query, maxResults = 10, pageToken }: { query: string; maxResults?: number; pageToken?: string }, { rejectWithValue }) => {
    try {
      const searchResponse = await searchYouTube({ query, maxResults, pageToken });

      const videoIds = searchResponse.items.map((item: any) => item.id);

      const detailsResponse = await getVideoDetails(videoIds);

      const videos = searchResponse.items.map((searchItem: any) => {
        // Find matching details for this video
        const detailItem = detailsResponse.items.find((detail: any) => detail.id === searchItem.id);

        return {
          id: searchItem.id,
          title: searchItem.title,
          description: detailItem?.snippet?.description || '',
          thumbnail: searchItem.thumbnailUrl,
          source: 'YouTube' as const,
          url: `https://www.youtube.com/watch?v=${searchItem.id}`,
          publishedAt: searchItem.publishedAt,
          channelTitle: searchItem.channelName,
          viewCount: detailItem?.statistics?.viewCount ? parseInt(detailItem.statistics.viewCount) : undefined,
          duration: detailItem?.contentDetails?.duration ? formatDuration(detailItem.contentDetails.duration) : undefined,
        };
      });

      return {
        videos,
        nextPageToken: searchResponse.nextPageToken,
        totalResults: searchResponse.totalResults
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    };
  }
);

export const fetchVideoDetails = createAsyncThunk(
  'videos/fetchVideoDetails',
  async (videoId: string, { rejectWithValue }) => {
    try {
      const detailsResponse = await getVideoDetails([videoId]);

      if (!detailsResponse.items || detailsResponse.items.length === 0) {
        throw new Error('Video not found');
      };

      const videoDetail = detailsResponse.items[0];

      return {
        id: videoDetail.id,
        title: videoDetail.snippet.title,
        description: videoDetail.snippet.description,
        thumbnail: videoDetail.snippet.thumbnails.high.url,
        source: 'YouTube' as const,
        url: `https://www.youtube.com/watch?v=${videoDetail.id}`,
        videoId: videoDetail.id,
        publishedAt: videoDetail.snippet.publishedAt,
        channelTitle: videoDetail.snippet.channelTitle,
        viewCount: videoDetail.statistics?.viewCount ? parseInt(videoDetail.statistics.viewCount) : undefined,
        duration: videoDetail.contentDetails?.duration ? formatDuration(videoDetail.contentDetails.duration) : undefined,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDemoVideos = createAsyncThunk(
  'videos/fetchDemoVideos',
  async (_, { rejectWithValue }) => {
    try {
      const demoVideos = getDemoVideos();

      const videos = demoVideos.map(demo => ({
        id: demo.id,
        title: demo.title,
        description: `Demo video showcasing ${demo.streamType.toUpperCase()} streaming capabilities`,
        thumbnail: demo.thumbnailUrl,
        source: 'Demo' as const,
        url: demo.streamUrl,
        publishedAt: demo.publishedAt,
        channelTitle: demo.channelName,
        viewCount: demo.viewCount,
        duration: demo.duration,
        streamUrl: demo.streamUrl,
        streamType: demo.streamType
      }));

      return {
        videos,
        totalResults: videos.length
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDemoVideoDetails = createAsyncThunk(
  'videos/fetchDemoVideoDetails',
  async (videoId: string, { rejectWithValue }) => {
    try {
      const demoVideos = getDemoVideos();
      const demoVideo = demoVideos.find(video => video.id === videoId);

      if (!demoVideo) {
        throw new Error('Demo video not found');
      }

      return {
        id: demoVideo.id,
        title: demoVideo.title,
        description: `Demo video showcasing ${demoVideo.streamType.toUpperCase()} streaming capabilities`,
        thumbnail: demoVideo.thumbnailUrl,
        source: 'Demo' as const,
        url: demoVideo.streamUrl,
        videoId: demoVideo.id,
        publishedAt: demoVideo.publishedAt,
        channelTitle: demoVideo.channelName,
        viewCount: demoVideo.viewCount,
        duration: demoVideo.duration,
        streamUrl: demoVideo.streamUrl,
        streamType: demoVideo.streamType
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedVideo: (state, action: PayloadAction<Video | null>) => {
      state.selectedVideo = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
      state.selectedVideo = null;
      state.nextPageToken = undefined;
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchYouTubeVideos thunk states
    builder
      .addCase(fetchYouTubeVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYouTubeVideos.fulfilled, (state, action) => {
        state.loading = false;

        //? For pagination, append new videos to existing ones if nextPageToken was provided
        if (action.meta.arg.pageToken) {
          state.videos = [...state.videos, ...action.payload.videos];
        } else {
          state.videos = action.payload.videos;
        }

        state.nextPageToken = action.payload.nextPageToken;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchYouTubeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ? Handle fetchVideoDetails thunk states
      .addCase(fetchVideoDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchDemoVideos thunk states
      .addCase(fetchDemoVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDemoVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchDemoVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchDemoVideoDetails thunk states
      .addCase(fetchDemoVideoDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDemoVideoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchDemoVideoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const selectVideoItems = createSelector(
  [(state: RootState) => state.videos.videos],
  (videos) => videos.map(video => ({
    id: video.id,
    title: video.title,
    thumbnailUrl: video.thumbnail,
    channelName: video.channelTitle || '',
    viewCount: video.viewCount,
    duration: video.duration,
    publishedAt: video.publishedAt,
    source: video.source,
    streamUrl: video.streamUrl,
    streamType: video.streamType
  }))
);

export const { setSelectedVideo, clearVideos } = videoSlice.actions;

export default videoSlice.reducer;