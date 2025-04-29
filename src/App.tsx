import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { performSearch } from './store/slices/searchSlice';
import { selectVideoItems, fetchVideoDetails, clearVideos } from './store/slices/videoSlice';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import SearchInput from './components/SearchInput/SearchInput';
import VideoGallery from './components/VideoGallery/VideoGallery';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import YouTubePlayer from './components/VideoPlayer/YouTubePlayer';
import { ErrorMessage, WelcomeMessage } from './components/Messages';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { query, platform, loading: searchLoading, error: searchError } = useAppSelector(state => state.search);
  const { selectedVideo, loading: videosLoading, error: videosError } = useAppSelector(state => state.videos);

  // Track if the user has performed a search yet
  const [hasSearched, setHasSearched] = useState(false);

  const formattedVideos = useAppSelector(selectVideoItems);

  const isLoading = searchLoading || videosLoading;
  const error = searchError || videosError;

  const handleSearch = (newQuery: string, newPlatform: 'Twitch' | 'YouTube') => {
    dispatch(performSearch({ query: newQuery, platform: newPlatform }));
    setHasSearched(true);
  };

  const handleRetry = () => {
    if (query) {
      dispatch(performSearch({ query, platform }));
    } else {
      dispatch(clearVideos());
      setHasSearched(false);
    }
  };

  const handleVideoSelect = (id: string, source: 'Twitch' | 'YouTube') => {
    // Fetch detailed video information
    if (source === 'YouTube') {
      dispatch(fetchVideoDetails(id));
    } else {
      // TODO - Future Twitch implementation
      console.log('Twitch video playback not yet implemented');
    }
  };
  
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
        
        {error && (
          <ErrorMessage 
            message={error}
            title={`Error ${platform === 'YouTube' ? 'searching YouTube' : 'searching Twitch'}`}
            onRetry={handleRetry}
          />
        )}
        
        {selectedVideo && (
          selectedVideo.source === 'YouTube' ? (
            <YouTubePlayer
              videoId={selectedVideo.id}
              title={selectedVideo.title}
              autoplay={true}
            />
          ) : (
            <VideoPlayer
              src={selectedVideo.url}
              poster={selectedVideo.thumbnail}
              title={selectedVideo.title}
            />
          )
        )}
        
        {!error && !hasSearched && formattedVideos.length === 0 && (
          <WelcomeMessage />
        )}
        
        {(hasSearched || formattedVideos.length > 0) && (
          <VideoGallery
            videos={formattedVideos}
            title={query ? `${platform} results for "${query}"` : `${platform} Videos`}
            isLoading={isLoading}
            onVideoSelect={handleVideoSelect}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;