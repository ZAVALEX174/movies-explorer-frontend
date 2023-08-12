import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';

const MoviesCardList = ({
  movies,
  isNotFound,
  isServerError,
  isMoviesPage,
  onDeleteMovie,
  onSaveMovie,
  isSavedMovies,
}) => {
  const [initialCards, setInitialCards] = useState({});
  const [moreCards, setMoreCards] = useState({});

  useEffect(() => {
    setInitialCards(5);
    setMoreCards(2);
  });

  let classIsNotFound = isNotFound
    ? 'cards__missing_visible'
    : 'cards__missing';

  let classServerError = isServerError
    ? 'cards__missing_visible'
    : 'cards__missing';

  function handleMoreButtonClick() {
    setInitialCards(initialCards + moreCards);
  }

  return (
    <section className='cards'>
      {isMoviesPage ? (
        <>
          <p className={classIsNotFound}>Ничего не найдено.</p>
          <p className={classServerError}>
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
          <ul className='cards__container'>
            {movies.slice(0, initialCards).map((movie, i) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  onDeleteMovie={onDeleteMovie}
                  onSaveMovie={onSaveMovie}
                  isSavedMovies={isSavedMovies}
                  isMoviesPage={isMoviesPage}
                />
              );
            })}
          </ul>
          <div className='cards__button-container'>
            <button
              type='button'
              onClick={handleMoreButtonClick}
              className={
                movies.length <= 7 || initialCards >= movies.length
                  ? 'cards__button_hidden'
                  : 'cards__button'
              }>
              Ещё
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={classIsNotFound}>Ничего не найдено.</p>
          <p className={classServerError}>
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
          <ul className='cards__container'>
            {movies.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.movieId}
                  onDeleteMovie={onDeleteMovie}
                  isSavedMovies={isSavedMovies}
                  isMoviesPage={isMoviesPage}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export { MoviesCardList };
