import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface SearchState {
    query: string;
    platform: 'YouTube' | 'Twitch';
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    platform: 'YouTube',
    loading: false,
    error: null,
};

export const searchVideos = createAsyncThunk(
    'search/searchVideos',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const { query, platform } = state.search;

            // TODO implement actual API calls later
            // ! This is just a placeholder
            if (platform === 'YouTube') {
                // Call YouTube API
                return [];
            } else {
                // Call Twitch API
                return [];
            }
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
        setPlatform: (state, action: PayloadAction<'YouTube' | 'Twitch'>) => {
            state.platform = action.payload;
        },
        clearSearch: (state) => {
            state.query = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchVideos.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(searchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setQuery, setPlatform, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;