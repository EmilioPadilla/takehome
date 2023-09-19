import React from 'react';
import './Dropdown.css';

interface DropdownProps {
  searchOptions: string[] | undefined; // Search options array from parent component
  selectedSearchType: string;
  setSelectedSearchType: (type: string) => void;
}

const Dropdown = ({
  searchOptions,
  selectedSearchType,
  setSelectedSearchType,
} : DropdownProps) => {
  return (
    <div className="dropdown">
      <label className="dropdown-label" htmlFor="dropdown-input">
        Filter by type
      </label>
      <select
        className="dropdown"
        value={selectedSearchType}
        onChange={(e) => setSelectedSearchType(e.target.value)}
      >
        <option defaultValue='default' key='default' value='default'>
            {`${searchOptions && searchOptions.length > 0 ? 'Choose one option' : 'No options available'}`}
          </option>
        {searchOptions?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;