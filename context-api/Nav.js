import React, { useContext } from 'react'
import { MovieContext } from './MovieContext'

const Nav = () => {
  const [movies] = useContext(MovieContext)

  return (
    <div style={{ background: '#000', color: '#fff', padding: '1rem', marginBottom: '1rem' }}>
      <h3>Dev Ed</h3>
      <p>List of movies: {movies.length}</p>
    </div>
  )
}

export default Nav
