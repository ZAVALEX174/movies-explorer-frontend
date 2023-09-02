import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useWindowSize } from '../Hooks/useWindowsSize';
import {
  MAX_WIDTH_1161,
  MIDDLE_WIDTH_730,
  MIDDLE_WIDTH_731,
  MIN_WIDTH_480,
  INITIAL_CARDS_12,
  INITIAL_CARDS_8,
  IINITIAL_CARDS_5,
  MORE_CARDS_3,
  MORE_CARDS_2,
} from '../../utils/constants';

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
  const windowWidth = useWindowSize();

  useEffect(() => {
    if (windowWidth >= MAX_WIDTH_1161) {
      setInitialCards(INITIAL_CARDS_12);
      setMoreCards(MORE_CARDS_3);
    }
    if (windowWidth < MAX_WIDTH_1161 && windowWidth >= MIDDLE_WIDTH_731) {
      setInitialCards(INITIAL_CARDS_8);
      setMoreCards(MORE_CARDS_2);
    }
    if (windowWidth <= MIDDLE_WIDTH_730 && windowWidth >= MIN_WIDTH_480) {
      setInitialCards(IINITIAL_CARDS_5);
      setMoreCards(MORE_CARDS_2);
    }
    if (windowWidth < MIN_WIDTH_480) {
      setInitialCards(IINITIAL_CARDS_5);
      setMoreCards(MORE_CARDS_2);
    }
  }, [windowWidth]);

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
