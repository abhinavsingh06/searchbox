import React from 'react'
import '../stylesheets/card.css';

export default function Card({ id, name, address, pincode, searchInput, filteredResult }) {

  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'blue' } : {} }>
            { part }
          </span>)
        }
      </span>
    );
  }

  return (
    <div className='dataCard'>
      <h1>
        {getHighlightedText(id,searchInput)}
      </h1>
      <h3>
        {getHighlightedText(name,searchInput)}
      </h3>
      {
        searchInput ? <div className='searchNotification'>{ searchInput } found in items</div> : ""
      }
      <p>
        {getHighlightedText(address,searchInput)}
      </p>
    </div>
  )
}
