import { Link } from 'react-router-dom';
import logo from '../../Images/logo.svg';

const Logo = () => {
  return (
    <Link to='/'>
      <img className='logo' src={logo} alt='Логотип - круглый зеленый бублик' />
    </Link>
  );
};

export { Logo };
