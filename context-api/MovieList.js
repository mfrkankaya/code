import React, { useState, useContext } from 'react'
import Movie from './Movie'
import { MovieContext } from './MovieContext'

const MovieList = () => {
  const [movies] = useContext(MovieContext)

  return (
    <>
      <h2>Movies</h2>
      <br></br>
      <div>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default MovieList
