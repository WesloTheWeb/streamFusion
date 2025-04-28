import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQuery, setPlatform, searchVideos } from '../../store/slices/searchSlice';
import classes from './SearchInput.module.scss';

const { searchContainer, modeContainer, activeButton, twitchButton, youtubeButton } = classes;

const SearchInput = () => {
    const [mode, setMode] = useState('YouTube');
    
    const handleModeChange = (selectedMode: string) => {
        setMode(selectedMode);
        console.log(`Mode is now ${mode}`);
    };

    return (
        <div className={searchContainer}>
            <input
                placeholder={`Search ${mode} videos...`}
            />
            <section className={modeContainer}>
                <button 
                    className={`${mode === 'Twitch' ? activeButton : ''} ${twitchButton}`}
                    disabled
                    onClick={() => handleModeChange('Twitch')}
                >
                    Twitch
                </button>
                <button 
                    className={`${mode === 'YouTube' ? activeButton : ''} ${youtubeButton}`}
                    onClick={() => handleModeChange('YouTube')}
                >
                    YouTube
                </button>
            </section>
        </div>
    );
};

export default SearchInput;