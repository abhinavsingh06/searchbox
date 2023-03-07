import React, { useState } from 'react'
import '../stylesheets/searchbar.css';
import Card from './Card';

export default function SearchBar({ placeholder, data }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    searchItems(value);
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResult(filteredData);
    }
    else {
      setFilteredResult([]);
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
            {filteredResult.map(({ id, name, address }) => (
              <Card key={id} id={id} name={name} address={address} searchInput={searchInput} filteredResult={filteredResult} />
            ))}
          </div>
        ) : <div className='searchResult'>No user found</div>
      }
    </div>  
  )
}
