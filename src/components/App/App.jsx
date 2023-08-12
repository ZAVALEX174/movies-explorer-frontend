import './App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';

function App() {
  // const navigate = useNavigate();

  // состояния компонентов
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isUserDataUpdateStatus, setIsUserDataUpdateStatus] = useState('');

  // функции изменения состояния компонентов
  const [isShowHeader, setIsShowHeader] = React.useState(true); // нужно ли показать шапку
  const [isShowFooter, setIsShowFooter] = React.useState(true); // нужно ли показать подвал

  const [allMovies, setAllMovies] = useState([]); // Данные всех фильмов
  const [initialMovies, setInitialMovies] = useState([]); // Список найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]); // Список фильмов по критериям
  const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы
  const [allSavedMovies, setAllSavedMovies] = useState(savedMovies);

  //* Проверить сохранен ли фильм
  const isSavedMovies = (movie) => {
    return savedMovies.some(
      (item) => item.movieId === movie.id && item.owner === currentUser._id
    );
  };
  
  function toggleHeader(state) {
    setIsShowHeader(state);
  }

  function toggleFooter(state) {
    setIsShowFooter(state);
  }

  const handleUpdateUserData = (data) => {
    setIsUserDataUpdateStatus();
  };

  // функция выхода
  function signOut() {
    setLoggedIn(false);
    setSavedMovies([]);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isShowHeader && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route
          path='/'
          element={<Main header={toggleHeader} footer={toggleFooter} />}
        />

        <Route
          path='/movies'
          element={
            <Movies
              header={toggleHeader}
              footer={toggleFooter}
              loggedIn={loggedIn}
              movies={foundMovies}
              isSavedMovies={isSavedMovies}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies
              header={toggleHeader}
              footer={toggleFooter}
              loggedIn={loggedIn}
              isSavedMovies={isSavedMovies}
              savedMovies={savedMovies}
              movies={allSavedMovies}
            />
          }
        />

        <Route
          path='/profile'
          element={
            <Profile
              header={toggleHeader}
              footer={toggleFooter}
              loggedIn={loggedIn}
              onUpdateUserData={handleUpdateUserData}
              signOut={signOut}
              isUserDataUpdateStatus={isUserDataUpdateStatus}
            />
          }
        />

        <Route
          path='/signup'
          element={<Register header={toggleHeader} footer={toggleFooter} />}
        />

        <Route
          path='/signin'
          element={<Login header={toggleHeader} footer={toggleFooter} />}
        />
        <Route
          path='*'
          element={<NotFoundPage header={toggleHeader} footer={toggleFooter} />}
        />
      </Routes>
      {isShowFooter && <Footer></Footer>}
    </CurrentUserContext.Provider>
  );
}

export default App;
