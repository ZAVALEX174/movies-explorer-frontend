import React from 'react';
import './Header.css';
import { Logo } from '../Logo/Logo';
import { Navigatoin } from '../Navigatoin/Navigatoin';

const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <Logo />
      <Navigatoin loggedIn={loggedIn} />
    </header>
  );
};

export { Header };
