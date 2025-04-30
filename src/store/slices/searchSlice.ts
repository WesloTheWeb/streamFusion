import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
    fetchYouTubeVideos, 
    clearVideos, 
    fetchDemoVideos
 } from './videoSlice';
import { VideoSource } from '../../interfaces';

export interface SearchState {
    query: string;
    platform: VideoSource;
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    platform: 'YouTube',
    loading: false,
    error: null,
};

export const performSearch = createAsyncThunk(
    'search/performSearch',
    async ({ query, platform }: { query: string; platform: VideoSource }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setQuery(query));
            dispatch(setPlatform(platform));
            dispatch(clearVideos());

            if (platform === 'Demo') {
                const result = await dispatch(fetchDemoVideos()).unwrap();
                return result;
            } else if (query.trim()) {
                if (platform === 'YouTube') {
                    const result = await dispatch(fetchYouTubeVideos({ query })).unwrap();
                    return result;
                } else {
                    // TODO: Future Twitch implementation
                    return null;
                }
            };

            return null;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        };
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setPlatform: (state, action: PayloadAction<VideoSource>) => {
            state.platform = action.payload;
        },
        clearSearch: (state) => {
            state.query = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(performSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(performSearch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(performSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setQuery, setPlatform, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;