import React from 'react'

const Movie = ({ movie: { name, price } }) => {
  return (
    <div style={{marginBottom: '.5rem'}}>
      <h3 style={{ marginBottom: '.25rem' }}>{name}</h3>
      <p>{price}</p>
    </div>
  )
}

export default Movie
