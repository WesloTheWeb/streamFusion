import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
}

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
};

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
    },
  },
  extraReducers: (builder) => {
    // TODO Add async thunks here later
  },
});

export const { setSelectedVideo, clearVideos } = videoSlice.actions;

export default videoSlice.reducer;