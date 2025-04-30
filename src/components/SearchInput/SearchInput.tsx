import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setPlatform } from '../../store/slices/searchSlice';
import { fetchDemoVideos } from '../../store/slices/videoSlice';
import SearchBar from './SearchBar';
import classes from './SearchInput.module.scss';

const {
    searchContainer,
    modeContainer,
    activeButton,
    twitchButton,
    youtubeButton,
    demoButton
} = classes;

interface SearchInputProps {
    onSearch?: (query: string, mode: 'Twitch' | 'YouTube') => void;
    initialMode?: 'Twitch' | 'YouTube';
    isLoading?: boolean;
};

const SearchInput = ({
    onSearch,
    initialMode = 'YouTube',
    isLoading = false
}: SearchInputProps = {}) => {
    const [mode, setMode] = useState<'Twitch' | 'YouTube'>(initialMode);
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim() && onSearch) {
            onSearch(query, mode);
        }
    };

    const handleModeChange = (selectedMode: 'Twitch' | 'YouTube') => {
        setMode(selectedMode);
    };

    const handleDemoVideosClick = () => {
        setPlatform('Demo');
        dispatch(setPlatform('Demo'));
        dispatch(fetchDemoVideos());
    };

    return (
        <form className={searchContainer} onSubmit={handleSubmit}>
            <SearchBar
                query={query}
                mode={mode}
                setQuery={setQuery}
                isLoading={isLoading}
                onSubmit={handleSubmit}
            />
            <section className={modeContainer}>
                <button
                    type="button"
                    className={`${mode === 'Twitch' ? activeButton : ''} ${twitchButton}`}
                    onClick={() => handleModeChange('Twitch')}
                    disabled={true}
                >
                    Twitch
                </button>
                <button
                    type="button"
                    className={`${mode === 'YouTube' ? activeButton : ''} ${youtubeButton}`}
                    onClick={() => handleModeChange('YouTube')}
                >
                    YouTube
                </button>
                <button
                    type="button"
                    className={demoButton}
                    onClick={handleDemoVideosClick}
                >
                    Demo
                </button>
            </section>
        </form>
    );
};

export default SearchInput;