import { ChangeEvent, FormEvent } from 'react';
import classes from './SearchBar.module.scss';

const { searchInputWrapper, searchIcon } = classes;

interface SearchBarProps {
  query: string;
  mode: 'Twitch' | 'YouTube';
  setQuery: (value: string) => void;
  isLoading?: boolean;
  onSubmit?: (e: FormEvent) => void;
};

const SearchBar = ({
  query,
  mode,
  setQuery,
  isLoading = false,
  onSubmit
}: SearchBarProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    };
  };

  return (
    <section className={searchInputWrapper}>
      <input
        placeholder={`Search ${mode} videos...`}
        value={query}
        onChange={handleChange}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={searchIcon}
        disabled={!query.trim() || isLoading}
        onClick={handleSubmit}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
            fill="white">
          </path>
        </svg>
      </button>
    </section>
  );
};

export default SearchBar;