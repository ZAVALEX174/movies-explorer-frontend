import './AboutMe.css';
import photo from '../../Images/kakBiFoto.jpg';

const AboutMe = () => {
  return (
    <section id='student' className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Александр</h3>
          <h4 className='about-me__job'>Фронтенд-разработчик, 40 лет</h4>
          <p className='about-me__description'>
            Я родился и живу в Челябинске, закончил ЗадиоТехнический Техникум. У
            меня есть жена и дочь. После того, как прошёл курс по
            веб-разработке.{' '}
          </p>
          <a
            className='about-me__link'
            href='https://github.com/ZAVALEX174'
            target='_blank'
            rel='noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__photo' src={photo} alt='Фотография' />
      </div>
    </section>
  );
};

export { AboutMe };
