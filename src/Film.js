import React, { useState, useEffect } from 'react';
import "./App.css";
import { Link } from 'react-router-dom'

function Film() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const [ customerId, setCustomerId] = useState("");
  const [ message, setMessage ] = useState("");


  useEffect(() => {
    fetch("/Allfilms")
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(err => console.log(err));
  }, []);

  const clicked = (index) => {
    setSelected(selected === index ? null : index);
  };

  const openPopup = (movie) => {
    setSelectedMovie(movie);
    setShowPopup(true);
    setMessage("");
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMovie(null);
    setCustomerId("");
  };


  const Renting = () => {
    if (!customerId){
      setMessage("NOT valid Customer ID");
      return;
    }

    fetch("/newRental", {
      method: "POST",
      headers: {"Content-Type": "application/json", },
      body: JSON.stringify({customer_id: parseInt(customerId), film_id: selectedMovie.film_id}),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setMessage(`${data.error}`);
      }
      else{
        setMessage("Movie Rented Successfully");
      }
    })

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
              <button className='movies_list' onClick={() => clicked(index)}>
                {movie.title}
                <p>Film Id: {movie.film_id}</p>
                <p>Release Year: {movie.release_year}</p>
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
                  {movie.Copies.map((dvdcopies, i) => (
                    <p>DVD Copies Availabel: {dvdcopies.DVD_Copies}</p>
                  ))}
                  <button className='rentoption' onClick={() => openPopup(movie)}>Rent This Movie</button>
                </div>
              )}
            </li>
          ))}


        </ul>
        {showPopup && selectedMovie && (
        <div className="popup">
          <div className="popup-content">
            <h2>Rent {selectedMovie.title}</h2>
            <p>Rental Rate: ${selectedMovie.rental_rate}</p>
            <p>Enter Customer Id:</p>
            <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            <p>Are you sure you want to rent this movie?</p>
            <button className="confirm" onClick={Renting}>Confirm Rent</button>
            <button className="close" onClick={closePopup}>Cancel</button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Film;