import React, { useState } from 'react'
import '../stylesheets/searchbar.css';
import Card from './Card';

export default function SearchBox({ placeholder, data }) {
  const [searchInput, setSearchInput] = useState('');
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  }

  return (
    <div className='search'>
      <div className='searchInput'>
        <input type="text" placeholder={placeholder} data={data} onChange={(e) => searchItems(e.target.value)} />
      </div>
      <div className='searchResult'>
          {data.map(({id, name, address}) => (
            <Card key={id} id={id} name={name} address={address} />
          ))}
      </div>
    </div>
  )
}
