import './SavedMovies.css';
import React from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import moviesSave from '../../utils/moviesSave';

const SavedMovies = (props) => {
  function toggleHeader() {
    props.header(true);
  }
  function toggleFooter() {
    props.footer(true);
  }
  React.useEffect(() => {
    toggleHeader();
    toggleFooter();
  }, []);

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={props.onSubmit}
        onCheckbox={props.onCheckbox}
        checked={props.checked}
      />
      <MoviesCardList
        movies={moviesSave}
        isMoviesPage={false}
        isSavedMovies={props.isSavedMovies}
        savedMovies={props.savedMovies}
      />
    </main>
  );
};

export { SavedMovies };
