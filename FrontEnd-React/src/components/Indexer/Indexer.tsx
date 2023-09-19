import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../Table/Table';
import { DirectoryInfo } from '../../types/index';
import SearchNameBar from '../SearchBar/SearchBar';
import Dropdown from '../Dropdown/Dropdown';
import { utils } from '../../utils/utils';
import './Indexer.css';

const Indexer = () => {
  const [data, setData] = useState<DirectoryInfo | undefined>();
  const [filteredData, setFilteredData] = useState<DirectoryInfo | undefined>();
  const [nameQuery, setNameQuery] = useState('');
  const [sizeQuery, setSizeQuery] = useState('');
  const [dropdownType, setDropdownType] = useState<string>('default');
  const [dropdownOptions, setDropdownOptions] = useState<string[]>();

  async function fetchData() {
    try {
      const indexData = await axios.get<DirectoryInfo | undefined>('http://localhost:3000/index-directory');
      setData(indexData.data);
      setDropdownOptions(indexData.data?.contentTypes);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Load Initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data by name
  useEffect(() => {
    const searchedData = utils.searchByProperty(data, nameQuery, 'name', dropdownType);
    setFilteredData(searchedData);
  }, [nameQuery]);

  // Filter data by size
  useEffect(() => {
    const searchedSizeData = utils.searchByProperty(data, sizeQuery, 'size', dropdownType);
    setFilteredData(searchedSizeData);
  }, [sizeQuery]);

  // Filter data by dropdown type
  useEffect(() => {
    const searchedDropdownData = utils.searchByProperty(data, null, undefined, dropdownType);
    setFilteredData(searchedDropdownData);
  }, [dropdownType]);

  return (
    <div>
      <h2>Indexed Files</h2>
      <div className='content-search'>
        <div className='content-header'>
          <button className='primary-button' onClick={() => fetchData()}>Refresh Files Data</button>
          <SearchNameBar onSearch={(nameQuery) => setNameQuery(nameQuery) } type='name' />
          <SearchNameBar onSearch={(sizeQuery) => setSizeQuery(sizeQuery) } type='size' />
          <Dropdown searchOptions={dropdownOptions} selectedSearchType={dropdownType} setSelectedSearchType={setDropdownType} />
        </div>
        <div className='content-body'>
          <Table fileDirectory={filteredData ? filteredData : data} />
        </div>
      </div>
    </div>
  );
};

export default Indexer;




