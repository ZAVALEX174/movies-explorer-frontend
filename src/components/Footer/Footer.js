import './Footer.css';

const Footer = () => {

    return (
        <footer className='footer'>
            <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
            <div className='footer__container'>
                <span className='footer__copyright'>&copy; {new Date().getFullYear()}</span>
                <div className='footer__content-socials'>
                    <a className='footer__link' href='https://practicum.yandex.ru' rel='noreferrer' target='_blank'>Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com/ZAVALEX174' rel='noreferrer' target='_blank'>Github</a>
                </div>
            </div>

        </footer>
    )
}

export { Footer };
