import React, { useState, useRef, useEffect } from 'react'
import '../stylesheets/searchbar.css';
import Card from './Card';

export default function SearchBar({ placeholder, data }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);
  const [searching, setSearching] = useState(false);
  
  const handleSearch = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setFilteredResult([])
      setSearching(false);
    }
    if (value?.length > 0) {
      searchItems(value);
      setSearching(true);
    }
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput.length !== 0) {
      const filteredData = data.filter((item) => {
        return Object.values(item).join(' ').toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResult(filteredData);
    }
  };

  return (
    <div className='search'>
      <div className='searchInput'>
        <input type="text" placeholder={placeholder} data={data} onChange={handleSearch} />
      </div>
      {
        filteredResult?.length > 0 ? (
          <div className='searchResult'>
            {filteredResult.map(({ id, name, address, pincode }, i) => (
              <Card key={id} id={id} name={name} address={address} pincode={pincode} searchInput={searchInput} filteredResult={filteredResult} />
            ))}
          </div>
          ) : (
          <>
            {searching ? (
              <div className='searchResult'>No user found</div>
            ) : (
                null
            )}
          </>  
        )
      }
    </div>  
  )
}
