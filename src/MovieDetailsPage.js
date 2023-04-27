import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './MovieDetailsPage.css';

const API_IMG = 'https://image.tmdb.org/t/p/w500';
const API_SIMILAR_MOVIES = 'https://api.themoviedb.org/3/movie';

function MovieDetailsPage(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    fetch(`${API_SIMILAR_MOVIES}/${id}/similar?api_key=6433d8c535ba67a23630361bb7d52258&language=fr-FR&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setSimilarMovies(data.results.slice(0, 8));
      });

    fetch(`${API_SIMILAR_MOVIES}/${id}?api_key=6433d8c535ba67a23630361bb7d52258&language=fr-FR`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="movie-details-header">
          <Link to="/" className="movie-details-back-link">
            <button className="btn btn-dark">Retour</button>
          </Link>
          <h1 className="movie-details-title">{movie.title}</h1>
          <img src={API_IMG + movie.poster_path} alt={movie.title} className="movie-details-poster" />
          <p className="movie-details-overview">{movie.overview}</p>
          <p className="movie-details-date">Date de sortie : {movie.release_date}</p>
        </div>

        <div className="similar-movies-section">
          <br></br>
          <h1 >Films similaires</h1>
          <br></br>
          <Carousel className="similar-movies-carousel">
            {similarMovies.map((movie) => (
              <Carousel.Item key={movie.id}>
                <Link to={`/movies/${movie.id}`} className="similar-movie-link">
                  <img
                    className="d-block w-100 similar-movie-poster"
                    src={`${API_IMG}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p className="similar-movie-title">{movie.title}</p>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
