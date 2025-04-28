import { useState } from 'react';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import './App.scss';
import SearchInput from './components/SearchInput/SearchInput';
import VideoGallery from './components/VideoGallery/VideoGallery';
import Footer from './components/Footer/Footer';
import { mockVideos } from './config';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'Twitch' | 'YouTube'>('YouTube');
  const [videos, setVideos] = useState(mockVideos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string, mode: 'Twitch' | 'YouTube') => {
    setSearchTerm(query);
    setSearchMode(mode);
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Filter mock videos based on search term and mode
      const filtered = mockVideos.filter(
        video =>
          video.source === mode &&
          (query === '' || video.title.toLowerCase().includes(query.toLowerCase()))
      );

      setVideos(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleVideoSelect = (id: string, source: 'Twitch' | 'YouTube') => {
    console.log(`Selected video ${id} from ${source}`);
    // Will handle video selection later
  };

  return (
    <>
      <header>
        <NavigationHeader />
      </header>
      <main>
        <SearchInput
          onSearch={handleSearch}
          initialMode={searchMode}
          isLoading={isLoading}
        />
        {error && <div className="error-message">{error}</div>}
        <VideoGallery
          videos={videos}
          title={searchTerm ? `${searchMode} results for "${searchTerm}"` : `${searchMode} Videos`}
          isLoading={isLoading}
          onVideoSelect={handleVideoSelect}
        />
      </main>
      <Footer />
    </>
  )
};

export default App;