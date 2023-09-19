import React, { useEffect, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  type: 'name' | 'size'
}

const SearchBar = ({ onSearch, type } : SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Instead of using the onClick method, we can use the useEffect hook to call the onSearch method when the searchQuery changes
  useEffect(() => {
    handleSearch()
  }, [searchQuery, onSearch]);

  return (
    <div className="search-bar">
      <label className="search-bar-label" htmlFor="search-bar-input">Filter by {type === 'name' ? 'name' : 'size (bytes) less than'}</label>
      <input
        type={`${type === 'name' ? 'text' : 'number'}`}
        className='search-bar-input'
        placeholder={`${type === 'name' ? 'example.pdf' : '1000 bytes'}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;