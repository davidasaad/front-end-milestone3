import React, { useState, useEffect } from 'react';
import "./App.css";
import { Link } from 'react-router-dom'



function Film() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/Allfilms")
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(err => console.log(err));
  }, []);

  const clicked = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div>
      <div>
      <h1>
        Sakila Movies By David
        <li className='right'>
        <Link className='Link' to="/"> <button>Home</button></Link>
        <Link className='Link' to="/films"> <button>Films</button></Link>
        <Link className='Link' to="/customers"><button>Customers</button></Link>
        </li>
      </h1>
        <h2 className="TopMovies">Movies List</h2>
        <ul className='moviesNames'>
          {movies.map((movie, index) => (
            <li key={movie.film_id || `movie-${index}`}>
              <button onClick={() => clicked(index)}>
                {movie.title}
              </button>
              {selected === index && (
                <div className="movie-description">
                  <p>Movie Description: {movie.description}</p>
                  <p>Rental Rate: ${movie.rental_rate}</p>
                  <p>Release Year: {movie.release_year}</p>
                  <p>Rental Duration: {movie.rental_duration} Days</p>
                  <p>Length: {movie.length} Minutes</p>
                  <p>Replacement Cost: ${movie.replacement_cost}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>Special Features: {movie.special_features}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Film;