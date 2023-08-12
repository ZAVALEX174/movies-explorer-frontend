import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__column'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div>
        <div className='about-project__timeline'>
          <div className='about-project__week'>1 неделя</div>
          <div className='about-project__weeks'>4 недели</div>
        </div>
        <div className='about-project__time-text'>
          <div className='about-project__backend-text'>Back-end</div>
          <div className='about-project__frontend-text'>Front-end</div>
        </div>
      </div>
    </section>
  );
};

export { AboutProject };
