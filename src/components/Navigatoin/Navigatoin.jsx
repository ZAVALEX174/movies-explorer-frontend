import './Navigatoin.css';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { SideBarNavigation } from '../SideBarNavigation/SideBarNavigation';

const Navigatoin = ({ loggedIn }) => {
  const [isSideBarNavigation, setIsSideBarNavigation] = useState(false);

  const closePopups = () => {
    setIsSideBarNavigation(false);
  };

  const openPopup = () => {
    setIsSideBarNavigation(true);
  };
  return (
    <>
      {loggedIn ? (
        <>
          <div className='navigation'>
            <nav className='navigation__links'>
              <NavLink
                to='/movies'
                className='navigation__link navigation__link_active'
               >
                Фильмы
              </NavLink>
              <NavLink
                to='/saved-movies'
                className='navigation__link navigation__link_active'
               >
                Сохранённые фильмы
              </NavLink>
            </nav>
          </div>
          <nav className='navigation'>
            <Link to='/profile'>
              <button className='navigation__btn' type='button'>
                Аккаунт
              </button>
            </Link>
          </nav>
          <button
            className='navigation-close'
            type='button'
            onClick={openPopup}
          />
        </>
      ) : (
        <>
          <nav className='navigation'>
            <Link
              to='/signup'
              className='navigation__link navigation__link_unregistered'>
              Регистрация
            </Link>
            <Link to='/signin'>
              <button className='navigation__button' type='button'>
                Войти
              </button>
            </Link>
          </nav>
        </>
      )}
      <SideBarNavigation isOpen={isSideBarNavigation} onClose={closePopups} />
    </>
  );
};

export { Navigatoin };
