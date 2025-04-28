import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQuery, setPlatform, searchVideos } from '../../store/slices/searchSlice';
import classes from './SearchInput.module.scss';

const { searchContainer, modeContainer, activeButton, twitchButton, youtubeButton } = classes;

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim() && onSearch) {
            onSearch(query, mode);
        }
    };

    const handleModeChange = (selectedMode: 'Twitch' | 'YouTube') => {
        setMode(selectedMode);
        console.log(`Mode is now ${selectedMode}`);
    };

    return (
        <form className={searchContainer} onSubmit={handleSubmit}>
            <input
                placeholder={`Search ${mode} videos...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
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
            </section>
            <button type="submit" disabled={!query.trim() || isLoading}>
                Search
            </button>
        </form>
    );
};

export default SearchInput;