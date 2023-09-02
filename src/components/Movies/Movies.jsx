import './Movies.css';
import React from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

const Movies = (props) => {
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
    <>
      <main className='movies'>
        <SearchForm
          onSubmit={props.onSubmit}
          onCheckbox={props.onCheckbox}
          checked={props.checked}
          defaultValue={props.searchKeyword}
          location={props.location}
          searchKeyword={props.searchKeyword}
          onChange={props.updateSaerchValue}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isMoviesPage={true}
            movies={props.movies}
            isNotFound={props.isNotFound}
            isServerError={props.isServerError}
            onSaveMovie={props.onSaveMovie}
            isSavedMovies={props.isSavedMovies}
            savedMovies={props.savedMovies}
            onDeleteMovie={props.onDeleteMovie}
          />
        )}
      </main>
    </>
  );
};

export { Movies };
