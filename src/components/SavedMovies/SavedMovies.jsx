import './SavedMovies.css';
import React, { useState } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

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

  // React.useEffect(() => {
  //   setCurrentSavedMovies(props.movies);

  //   updateCurrentMovies();
  // }, [props.movies]);

  // React.useEffect(() => {
  //   console.log(currentSavedMovies);
  // }, [currentSavedMovies]);

  // console.log(props.movies);

  return (
    <main className='saved-movies'>
      <SearchForm
        allMovies={props.allMovies}
        onSubmit={props.updateCurrentMovies}
        onCheckbox={props.onCheckbox}
        checked={props.checked}
        location={props.location}
        onChange={props.updateSaerchValue}
        searchKeyword={props.searchKeyword}
      />
      <MoviesCardList
        movies={props.movies}
        isMoviesPage={false}
        isSavedMovies={props.isSavedMovies}
        savedMovies={props.savedMovies}
        onDeleteMovie={props.onDeleteMovie}
        isNotFound={props.isNotFound}
        isServerError={props.isServerError}
      />
    </main>
  );
};

export { SavedMovies };
