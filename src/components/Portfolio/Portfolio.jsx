import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://zavalex174.github.io/ZAVALEX174-how-to-learn/'
            target='_blank'>
            Статичный сайт
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://zavalex174.github.io/russian-travel/'
            target='_blank'>
            Адаптивный сайт
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/ZAVALEX174/react-mesto-api-full-gha'
            target='_blank'>
            Одностраничное приложение
            <span>↗</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export { Portfolio };
