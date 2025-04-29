// src/App.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setQuery, setPlatform } from './store/slices/searchSlice';
import { fetchYouTubeVideos, clearVideos, selectVideoItems } from './store/slices/videoSlice';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import SearchInput from './components/SearchInput/SearchInput';
import VideoGallery from './components/VideoGallery/VideoGallery';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { query, platform, loading: searchLoading, error: searchError } = useAppSelector(state => state.search);
  const { selectedVideo, loading: videosLoading, error: videosError } = useAppSelector(state => state.videos);

  const formattedVideos = useAppSelector(selectVideoItems);

  // Determine if we're loading anything
  const isLoading = searchLoading || videosLoading;

  // Combine error messages if any
  const error = searchError || videosError;

  // Handle the search function
  const handleSearch = (newQuery: string, newPlatform: 'Twitch' | 'YouTube') => {
    // Update search state
    dispatch(setQuery(newQuery));
    dispatch(setPlatform(newPlatform));

    // Clear existing videos
    dispatch(clearVideos());

    // Only fetch if we have a query
    if (newQuery.trim()) {
      if (newPlatform === 'YouTube') {
        dispatch(fetchYouTubeVideos({ query: newQuery }));
      } else {
        // Future Twitch implementation
        console.log('Twitch search not yet implemented');
      }
    }
  };

  // Handle video selection
  const handleVideoSelect = (id: string, source: 'Twitch' | 'YouTube') => {
    console.log(`Selected video ${id} from ${source}`);
    // You'll implement video selection handling later
    // This might include: dispatch(fetchVideoDetails(id));
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  return (
    <>
      <header>
        <NavigationHeader />
      </header>
      <main>
        <SearchInput
          onSearch={handleSearch}
          initialMode={platform}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        {/* Show video player if a video is selected */}
        {selectedVideo && (
          <VideoPlayer
            src={selectedVideo.url}
            poster={selectedVideo.thumbnail}
            title={selectedVideo.title}
          />
        )}

        <VideoGallery
          videos={formattedVideos}
          title={query ? `${platform} results for "${query}"` : `${platform} Videos`}
          isLoading={isLoading}
          onVideoSelect={handleVideoSelect}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;