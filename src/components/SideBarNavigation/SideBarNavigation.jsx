import './SideBarNavigation.css';
import { NavLink, Link } from 'react-router-dom';

const SideBarNavigation = ({ onClose, isOpen }) => {
  const popupIsOpen = isOpen ? 'popup_is-active' : '';

  return (
    <div className={`popup ${popupIsOpen}`}>
      <div className='popup__overlay'>
        <div className='popup__container'>
          <button type='button' className='popup__close' onClick={onClose} />
          <ul className='popup__list' onClick={onClose}>
            <li className='popup__item'>
              <NavLink to='/' className='popup__link'>
                Главная
              </NavLink>
            </li>
            <li className='popup__item'>
              <NavLink to='/movies' className='popup__link '>
                Фильмы
              </NavLink>
            </li>
            <li className='popup__item'>
              <NavLink to='/saved-movies' className='popup__link '>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link to='/profile'>
            <button className='popup__button' type='button' onClick={onClose}>
              Аккаунт
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SideBarNavigation };
