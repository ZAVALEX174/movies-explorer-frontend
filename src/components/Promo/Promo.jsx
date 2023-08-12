import './Promo.css';
import { NavBar } from '../NavBar/NavBar';

const Promo = () => {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavBar />
    </section>
  );
};

export { Promo };
