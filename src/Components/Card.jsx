import React from 'react'
import '../stylesheets/card.css';

export default function Card({id, name, address}) {
  return (
    <div className='dataCard'>
      <h1>{id}</h1>
      <h3>{name}</h3>
      <p>{address}</p>
    </div>
  )
}
