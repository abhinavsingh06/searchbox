import React from 'react'
import '../stylesheets/card.css';

export default function Card({ data, searchInput, active, setSelected, setHovered, innerRef }) {

  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'rgb(49, 202, 240)' } : {} }>
            { part }
          </span>)
        }
      </span>
    );
  }

  return (
    <div className={`${active ? "active" : ""} dataCard`}
      ref={innerRef}
      onClick={() => setSelected(data)}
      onMouseEnter={() => setHovered(data)} onMouseLeave={() => setHovered(undefined)}>
      <h1>
        {getHighlightedText(data.id,searchInput)}
      </h1>
      <h3>
        {getHighlightedText(data.name,searchInput)}
      </h3>
      {
        searchInput ? <div className='searchNotification'>"{ searchInput }" found in items</div> : ""
      }
      <p>
        {getHighlightedText(data.address,searchInput)}
      </p>
    </div>
  )
}
