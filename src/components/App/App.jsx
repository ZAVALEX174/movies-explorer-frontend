import './App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useState, useEffect } from 'react';
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
import * as mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
// import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useLocation } from 'react-router-dom';

function App() {
  // состояния компонентов
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });
  const [isUserDataUpdateStatus, setIsUserDataUpdateStatus] = useState('');
  const location = useLocation();

  // состояния ошибок и загрузок
  const [errorMessage, setErrorMessage] = useState();
  const [isServerError, setIsServerError] = useState(false); //Произошла ошибка при поиске фильмов
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  // изменения состояния компонентов
  const [isShowHeader, setIsShowHeader] = useState(true); // нужно ли показать шапку
  const [isShowFooter, setIsShowFooter] = useState(true); // нужно ли показать подвал

  // состояния по фильмам
  const [allMovies, setAllMovies] = useState([]); // Данные всех фильмов
  const [initialMovies, setInitialMovies] = useState([]); // Список найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]); // Список фильмов по критериям
  const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы
  // const [allSavedMovies, setAllSavedMovies] = useState(savedMovies);
  // const [filteredMovies, setFilteredMovies] = useState(allSavedMovies);

  // состояния для формы поиска фильмов
  const [selectedCheckbox, setSelectedCheckbox] = useState(false); // Флажок короткометражек не выбран
  const [searchKeywordMovies, setSearchKeywordMovies] = useState(''); // Ключевое слово
  const [searchKeywordSavedMovies, setSearchKeywordSavedMovies] = useState(''); // Ключевое слово
  const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false);
  const [checkboxMovies, setCheckboxMovies] = useState(false);

  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  // const [currentMovies, setCurrentMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    if (localStorage.getItem('checkboxSavedMovies') === 'true') {
      setCheckboxSavedMovies(true);
    }
  }, []);

  useEffect(() => {
    setSearchKeywordSavedMovies(
      localStorage.getItem('searchKeywordSavedMovies')
    );
  }, [localStorage.getItem('searchKeywordSavedMovies')]);

  useEffect(() => {
    if (checkboxSavedMovies) {
      localStorage.setItem('checkboxSavedMovies', true);
    } else {
      localStorage.setItem('checkboxSavedMovies', false);
    }
  }, [checkboxSavedMovies]);

  useEffect(() => {
    if (checkboxMovies) {
      localStorage.setItem('checkboxMovies', true);
    } else {
      localStorage.setItem('checkboxMovies', false);
    }
  }, [checkboxMovies]);

  function toggleHeader(state) {
    setIsShowHeader(state);
  }

  function toggleFooter(state) {
    setIsShowFooter(state);
  }

  // // запрос пользователя по поиску фильмов
  const handleRequestMovies = () => {
    localStorage.setItem('selectedCheckbox', selectedCheckbox); // Записываем в сторедж выставленное положение флажка
    if (allMovies.length === 0) {
      // если фильмов в localStorage нет, сделаем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(false);
          // localStorage.setItem('allMovies', JSON.stringify(movies)); // Записываем в сторедж все полученные фильмы с BeatfilmMoviesApi
          setIsServerError(false);
          setAllMovies(movies);
          handleSetFoundMovies(movies, selectedCheckbox); // Находим фильмы по запросу и выставленным критериям
        })
        .catch((err) => {
          // console.log(3)
          setIsServerError(true);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    } else {
      handleSetFoundMovies(allMovies, selectedCheckbox);
    }
  };

  // Найдем фильмы по критериям
  const handleSetFoundMovies = (movies, checkbox) => {
    setIsLoading(true);
    const moviesList = findMovies(movies);
    if (moviesList.length === 0) {
      // console.log(1);
      setIsNotFound(true);
    } else {
      // console.log(2);
      setIsNotFound(false);
    }
    setInitialMovies(moviesList);
    setFoundMovies(checkbox ? handleShortMovies(moviesList) : moviesList);
    console.log(foundMovies);
    // localStorage.setItem('foundMovies', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    console.log(isNotFound)
  }, [isNotFound])

  // // находим фильмы по ключевому слову
  // const findMovies = (movies) => {
  //   let keyword = '';
  //   let checkbox = '';

  //   if (location.pathname === '/movies') {
  //     keyword = localStorage.getItem('searchKeyword');
  //     checkbox = localStorage.getItem('selectedCheckbox');
  //   } else {
  //     keyword = localStorage.getItem('searchKeywordSavedMovies');
  //     checkbox = localStorage.getItem('checkboxSavedMovies');
  //   }

  //   if (keyword) {
  //     const moviesКeywordSearch = movies.filter((movie) => {
  //       return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
  //     });
  //     if (checkbox) {
  //       return handleShortMovies(moviesКeywordSearch);
  //     } else {
  //       return moviesКeywordSearch;
  //     }
  //   }
  // };

  // // находим фильмы по ключевому слову
  const findMovies = (movies, checkbox) => {
    const moviesКeywordSearch = movies.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchKeywordMovies.toLowerCase());
    });
    if (checkbox) {
      return handleShortMovies(moviesКeywordSearch);
    } else {
      return moviesКeywordSearch;
    }
  };

  const handleSearchMovies = (movies) => {
    // let newList = [];
    if (location.pathname === '/movies') {
      const newList = movies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(searchKeywordMovies.toLowerCase());
      });
      return newList;
    } else {
      const newList = movies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(searchKeywordSavedMovies.toLowerCase());
      });
      // console.log(newList)
      return newList;
    }
  };

  // // Поиск короткометражныx фильмов
  const handleShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  // // Отслеживание состояние стэйта чекбокса
  // useEffect(() => {
  //   if (localStorage.getItem('checkboxSavedMovies') === 'true') {
  //     setCheckboxSavedMovies(true);
  //     // setSavedMovies(handleShortMovies(savedMovies));
  //   } else {
  //     setCheckboxSavedMovies(false);
  //     // setSavedMovies(savedMovies);
  //   }
  // }, [localStorage.getItem('checkboxSavedMovies')]);

  const updateSaerchValue = (value) => {
    if (location.pathname === '/movies') {
      setSearchKeywordMovies(value);
      localStorage.setItem('searchKeyword', value);
    } else {
      setSearchKeywordSavedMovies(value);
      localStorage.setItem('searchKeywordSavedMovies', value);
    }
  };

  // // Меняем состояние чекбокса на короткометражки
  // function handleChangeCheckboxSavedMovies() {
  //   if (!checkboxSavedMovies) {
  //     // setCheckboxSavedMovies(true);
  //     // setAllSavedMovies(handleShortMovies(filteredMovies));
  //     // if (handleShortMovies(filteredMovies).length === 0) {
  //     //   setIsNotFound(true); //true
  //     // }
  //     // setIsNotFound(false); // false
  //   } else {
  //     // setCheckboxSavedMovies(false);
  //     // if (filteredMovies.length === 0) {
  //     //   setIsNotFound(true);
  //     // }
  //     // setIsNotFound(false);
  //     // setAllSavedMovies(filteredMovies);
  //   }
  // }

  // // // Поиск фильмов из сохраненных ранее по ключевому слову
  // function handleSearchSavedMovies(keyword) {
  //   if (findMovies(savedMovies).length === 0) {
  //     setIsNotFound(true);
  //   } else {
  //     setIsNotFound(false);
  //     setFilteredMovies(findMovies(savedMovies));
  //     setAllSavedMovies(findMovies(savedMovies));
  //   }
  // }

  // // Отслеживание состояния стэйтов
  useEffect(() => {
    setSearchKeywordMovies(localStorage.getItem('searchKeyword' || ''));
    setSearchKeywordSavedMovies(
      localStorage.getItem('searchKeywordSavedMovies' || '')
    );
    // console.log(searchKeywordSavedMovies)
    setSelectedCheckbox(
      localStorage.getItem('selectedCheckbox' || '') === 'true'
    );
    if (foundMovies.length !== 0) {
      setInitialMovies(foundMovies);
      if (localStorage.getItem('selectedCheckbox') === 'true') {
        setFoundMovies(handleShortMovies(foundMovies));
      } else {
        setFoundMovies(foundMovies);
      }
    }
  }, []);

  React.useEffect(() => {
    setCurrentSavedMovies(savedMovies);
    updateCurrentSavedMovies(savedMovies);
  }, [savedMovies]);

  React.useEffect(() => {
    if (currentSavedMovies.length === 0 && !isServerError) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [currentSavedMovies, isServerError]);

  // React.useEffect(() => {
  //   updateCurrentMovies(movies);
  // }, [movies, checkboxMovies]);

  // React.useEffect(() => {
  //   updateCurrentSavedMovies(savedMovies);
  // }, [savedMovies, checkboxSavedMovies]);

  // const updateCurrentMovies = (movies) => {

  //   if (checkboxSavedMovies) {
  //     setCurrentMovies(handleShortMovies(movies));
  //     // console.log(props.searchKeywordSavedMovies !== '')
  //     if (searchKeywordSavedMovies) {

  //       setCurrentMovies(handleShortMovies(handleSearchMovies(movies)))
  //       // console.log(props.handleSearchMovies(currentSavedMovies))
  //     }
  //   } else {
  //     setCurrentMovies(movies);
  //     if (searchKeywordSavedMovies ) {

  //       setCurrentMovies(handleSearchMovies(movies));
  //       // console.log(props.handleSearchMovies(currentSavedMovies))
  //     }
  //   }
  //   // }
  //   // console.log(currentSavedMovies)
  // };

  const updateCurrentSavedMovies = (movies) => {
    //   console.log(currentSavedMovies)
    //   if (props.checkboxSavedMovies) {
    //     setCurrentSavedMovies(props.handleShortMovies(props.movies));
    //   } else {
    //     setCurrentSavedMovies(props.movies);
    //   }
    // } else {
    if (checkboxSavedMovies) {
      setCurrentSavedMovies(handleShortMovies(movies));
      // console.log(props.searchKeywordSavedMovies !== '')
      if (searchKeywordSavedMovies) {
        setCurrentSavedMovies(handleShortMovies(handleSearchMovies(movies)));
        // console.log(props.handleSearchMovies(currentSavedMovies))
      }
    } else {
      setCurrentSavedMovies(movies);
      if (searchKeywordSavedMovies) {
        setCurrentSavedMovies(handleSearchMovies(movies));
        // console.log(props.handleSearchMovies(currentSavedMovies))
      }
    }
    // }
    // console.log(currentSavedMovies)
  };

  // Меняем состояние чекбокса на короткометражки
  const handleChangeCheckbox = () => {
    setSelectedCheckbox(!selectedCheckbox);
    // console.log(selectedCheckbox);
    if (!selectedCheckbox) {
      setFoundMovies(handleShortMovies(initialMovies));
      if (foundMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false); //???
      }
    } else {
      setFoundMovies(initialMovies);
    }
    localStorage.setItem('selectedCheckbox', !selectedCheckbox);
  };

  // // Проверить сохранен ли фильм
  const isSavedMovies = (movie) => {
    return savedMovies.some(
      (item) => item.movieId === movie.id && item.owner === currentUser._id
    );
  };

  // // сохранение фильма на страницу "Сохраненные фильмы"
  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    mainApi
      .saveMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleCheckbox = () => {
    setCheckboxSavedMovies(!checkboxSavedMovies);
  };

  // // удаление фильма с страницы "Сохраненные фильмы"
  function handleDeleteMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    const deleteCard = savedMovies.find(
      (item) =>
        item.movieId === (movie.id || movie.movieId) &&
        item.owner === currentUser._id
    );
    if (!deleteCard) return;
    mainApi
      .deleteMovie(deleteCard._id, jwt) //?
      .then((removedMovie) => {
        setSavedMovies(savedMovies.filter((c) => c._id !== removedMovie._id));
        findMovies(savedMovies);
        // console.log(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // // Регистрация пользователя
  const handleRegistration = ({ name, email, password }) => {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          console.log(err);
          setErrorMessage('Пользователь с таким email уже зарегистрирован');
        } else {
          setErrorMessage('Переданы некорректные данные');
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  // // Авторизация пользователя
  const handleAuthorization = ({ email, password }) => {
    mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          // setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
          navigate('./movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setErrorMessage('Неверный email или пароль');
        } else {
          setErrorMessage('Что-то пошло не так...');
        }
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  // // Проверяем токен пользователя и получение его контента
  const handleTokenCheck = () => {
    // console.log(1)
    const token = localStorage.getItem('jwt');
    // if (!token) {
    //   return;
    // }
    mainApi
      .getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
    mainApi
      .getSavedMovies(token)
      .then((data) => {
        setLoggedIn(true);
        setSavedMovies(data);
        setIsServerError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsServerError(true);
        // console.log(2)
      });
  };

  // // Изменить данные пользователя в профиле
  const handleUpdateUserData = (data) => {
    const jwt = localStorage.getItem('jwt');
    mainApi
      .updateUserInfo(data, jwt)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsUserDataUpdateStatus('Данные успешно обновлены!');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setIsUserDataUpdateStatus(
            'Пользователь с таким email уже зарегистрирован'
          );
        } else {
          setIsUserDataUpdateStatus('Что-то пошло не так...');
        }
      })
      .finally(() => {
        setTimeout(() => setIsUserDataUpdateStatus(''), 2000);
      });
  };

  // функция выхода
  function signOut() {
    localStorage.clear();
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
    setInitialMovies([]);
    setSavedMovies([]);
    setFoundMovies(false);
    setSelectedCheckbox(false);
    setSearchKeywordMovies('');
    setSearchKeywordSavedMovies('');
    setFoundMovies([]);
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
            <ProtectedRoute
              component={Movies}
              header={toggleHeader}
              footer={toggleFooter}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              movies={foundMovies}
              isSavedMovies={isSavedMovies}
              isLoading={isLoading}
              onCheckbox={handleChangeCheckbox}
              checked={selectedCheckbox}
              isNotFound={isNotFound}
              isServerError={isServerError}
              onSubmit={handleRequestMovies}
              searchKeyword={searchKeywordMovies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              location={location}
              handleShortMovies={handleShortMovies}
              checkboxMovies={checkboxSavedMovies}
              updateSaerchValue={updateSaerchValue}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              component={SavedMovies}
              header={toggleHeader}
              footer={toggleFooter}
              loggedIn={loggedIn}
              isSavedMovies={isSavedMovies}
              onDeleteMovie={handleDeleteMovie}
              // savedMovies={savedMovies}
              onCheckbox={toggleCheckbox}
              // handleSearchMovies={handleSearchMovies}
              checked={checkboxSavedMovies}
              allMovies={savedMovies}
              movies={currentSavedMovies}
              updateCurrentMovies={updateCurrentSavedMovies}
              isNotFound={isNotFound}
              location={location}
              isServerError={isServerError}
              handleShortMovies={handleShortMovies}
              // checkboxSavedMovies={checkboxSavedMovies}
              searchKeyword={searchKeywordSavedMovies}
              updateSaerchValue={updateSaerchValue}
              setSearchKeyword={setSearchKeywordSavedMovies}
            />
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute
              component={Profile}
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
          element={
            <Register
              header={toggleHeader}
              footer={toggleFooter}
              onRegister={handleRegistration}
              errorMessage={errorMessage}
            />
          }
        />

        <Route
          path='/signin'
          element={
            <Login
              header={toggleHeader}
              footer={toggleFooter}
              onLogin={handleAuthorization}
              errorMessage={errorMessage}
            />
          }
        />
        <Route
          path='*'
          element={
            <NotFoundPage
              header={toggleHeader}
              footer={toggleFooter}
              // onLogin={handleAuthorization}
              errorMessage={errorMessage}
            />
          }
        />
      </Routes>
      {isShowFooter && <Footer></Footer>}
    </CurrentUserContext.Provider>
  );
}

export default App;
