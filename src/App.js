import React, { useEffect, useState } from 'react';
import MovieBox from './MovieBox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetailsPage from './MovieDetailsPage';
import './App.css';

const API_POPULAR_URL = "https://api.themoviedb.org/3/movie/popular?api_key=6433d8c535ba67a23630361bb7d52258&language=fr-FR";
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=6433d8c535ba67a23630361bb7d52258&language=fr-FR&query=";

function MovieGrid({ movies }) {
  return (
    <div className="grid">
      {movies.length ? (
        movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)
      ) : (
        <p>Aucun film trouvé</p>
      )}
    </div>
  );
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let url = searchValue === "" ? API_POPULAR_URL : API_SEARCH_URL + searchValue;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      });
  }, [searchValue]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Router>
      <div className="container">
        <div className="navbar">
          <h1>Netflix</h1>
          <form action="#" className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <Routes>
          <Route index path="/" element={<MovieGrid movies={movies} />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;