import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

function App(){

  const [topMovies, setTopMovies] = useState([]);
  const [topActors, setTopActors] = useState([]);
  const [selected, setselected] = useState(null);
  
  useEffect(() => {

    fetch("/top5RentedMovies")
      .then(response => response.json())
      .then(data => setTopMovies(data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {

    fetch("/topActors")
      .then(response => response.json())
      .then(data => setTopActors(data))
      .catch(err => console.log(err))
  }, []);
  

  const clicked = (index) => {
    setselected(selected === index ? null : index);
  }

  return (
      <div className='Homepage'>
      <h1>
        Sakila Movies By David
        <li className='right'>
        <Link className='Link' to="/"> <button>Home</button></Link>
        <Link className='Link' to="/films"> <button>Films</button></Link>
        <Link className='Link' to="/customers"><button>Customers</button></Link>
        </li>
      </h1>
      <div className='ActorAndMovies'>
        <h2 className="TopMovies">Top 5 Rented Movies</h2>
        <ul>
          {topMovies.map((movie, index) => {
            const movieId = `movie-${index}`;
            return (
              <li className='topmovieslist' key={movieId}>
                <button className='topmovies' onClick={() => clicked(movieId)}>
                  {movie.title}
                  <p>Rentals Count: {movie.rental_count}</p>
                  <p>Renatl Rate: ${movie.rental_rate}</p>
                </button>
                {selected === movieId && (
                  <div className="movie-description">
                    <p>Movie Description: {movie.description}</p>
                    <p>Rentals Count: {movie.rental_count}</p>
                    <p>Renatl Rate: ${movie.rental_rate}</p>
                    <p>Release Year: {movie.release_year}</p>
                    <p>Rental Duration: {movie.rental_duration} Days</p>
                    <p>Length: {movie.length} Minutes</p>
                    <p>Replacement Cost: ${movie.replacement_cost}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Spacial Features: {movie.special_features}</p>

                  
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <h2 className="TopActors">Top 5 Actors</h2>
        <ul>
          {topActors.map((actor, index) => {
            const actorId = `actor-${index}`;
            return (
              <li className='top5actors' key={actorId}>
                <button className='top5s' onClick={() => clicked(actorId)}>
                  {actor.first_name}, {actor.last_name}
                  <p>Actor ID: {actor.actor_id}</p>
                  <p>Movies: {actor.rental_count}</p>
                </button>
                {selected === actorId && (
                  <div className="actor-rentals">
                    <p>Top five Movies for {actor.first_name}:</p>
                    <ul>
                      {actor.top_movie.map((movie, i) => (
                        <li>
                          {movie.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
