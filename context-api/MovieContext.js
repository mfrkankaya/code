import React, { useState, createContext } from 'react'

export const MovieContext = createContext()

export const MovieProvider = props => {
  const [movies, setMovies] = useState([
    {
      name: 'Harry Potter',
      price: '$20',
      id: 1343141
    },
    {
      name: 'Inception',
      price: '$15',
      id: 13431413
    }
  ])

  return <MovieContext.Provider value={[movies, setMovies]}>{props.children}</MovieContext.Provider>
}
