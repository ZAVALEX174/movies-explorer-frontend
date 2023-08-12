import './MoviesCard.css';
import { convertDuration } from '../../utils/ConvertDuration';
import { useLocation } from 'react-router-dom';
import movies from '../../utils/movies';

const MoviesCard = ({
  movie,
  isMoviesPage,
  onSaveMovie,
  onDeleteMovie,
  isSavedMovies,
}) => {
  const location = useLocation();

  const handleSaveMovie = () => {
    // onSaveMovie(movie); // на след этапе
  };

  const handleDeleteMovie = () => {
    // onDeleteMovie(movie); // на след этапе
  };

  return (
    <li className='card'>
      <a
        href={movies.trailerLink}
        className='card__trailer-link'
        target='_blank'
        rel='noreferrer'>
        {location.pathname === '/movies' && (
          <img
            src={`https://api.nomoreparties.co/${movie.image.url}`}
            alt={movie.nameRU}
            className='card__poster-movie'
          />
        )}
        {location.pathname === '/saved-movies' && (
          <img
            src={`https://api.nomoreparties.co/${movie.image.url}`}
            alt={movie.nameRU}
            className='card__poster-movie'
          />
        )}
      </a>
      <div className='card__description-movie'>
        <span className='card__name-movie'>{movie.nameRU}</span>
        <span className='card__duration-movie'>
          {convertDuration(movie.duration)}
        </span>
      </div>

      {isMoviesPage ? (
        isSavedMovies(movie) ? (
          <button
            className='card__button card__button_saved'
            onClick={handleDeleteMovie}
            type='button' />
        ) : (
          <button
            className='card__button '
            onClick={handleSaveMovie}
            type='button'
          />
        )
      ) : (
        <button
          className='card__button card__button_delete '
          onClick={handleDeleteMovie}
          type='button'
        />
      )}
    </li>
  );
};

export { MoviesCard };
