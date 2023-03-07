import React from 'react'
import '../stylesheets/card.css';

export default function Card({id, name, address, searchInput, filteredResult}) {
  return (
    <div className='dataCard'>
      <div>
        {id.includes(searchInput) ?
          (<span>
            <span style={{ color: 'red' }}>{id.slice(0, searchInput.length)}</span>
            <span>{id.slice(searchInput.length)}</span>
          </span>) : (
            <span>
              <span>{id}</span>
            </span>
          )}
      </div>
      <div>
      {name.toLowerCase().includes(searchInput.toLowerCase()) ?
        (<span>
          <span style={{ color: 'red' }}>{name.slice(0, searchInput.length)}</span>
          <span>{name.slice(searchInput.length)}</span>
        </span>) : (
          <span>
            <span>{name}</span>
          </span>
          )}
      </div>
      <div>
      {address.toLowerCase().includes(searchInput.toLowerCase()) ?
        (<span>
          <span style={{ color: 'red' }}>{address.slice(0, searchInput.length)}</span>
          <span>{address.slice(searchInput.length)}</span>
        </span>) : (
          <span>
            <span>{address}</span>
          </span>
          )}
        </div>
    </div>
  )
}
