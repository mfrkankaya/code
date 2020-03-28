import React, { useState, useContext } from 'react'
import { MovieContext } from './MovieContext'

const AddMovie = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [movies, setMovies] = useContext(MovieContext)

  const addMovie = () => {
    setMovies(prevMovies => [...prevMovies, { price, name, id: new Date().getTime() }])
  }

  const handleSubmit = e => {
    e.preventDefault()
    addMovie()
  }

  return (
    <>
      <h2>Add Movie</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          style={{ padding: '1rem', borderRadius: 3, border: '1px solid #ddd', marginRight: '.5rem' }}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
        />
        <input
          style={{ padding: '1rem', borderRadius: 3, border: '1px solid #ddd', marginRight: '.5rem' }}
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          type="text"
          name="price"
        />
        <button style={{ padding: '1rem', background: '#000', border: '1px solid #ddd', borderRadius: 3, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} type="submit">
          Ekle
        </button>
      </form>
    </>
  )
}

export default AddMovie
