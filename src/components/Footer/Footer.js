import React from "react";
import "./Footer.css"

export default function Footer() {
    return(
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <p className="footer__copyright">&#169; 2021</p>
            <ul className="footer__list">
                <li className="footer__list-item link-effect"><a href="https://practicum.yandex.ru" className="footer__link">Яндекс.Практикум</a></li>
                <li className="footer__list-item link-effect"><a href="https://github.com/bodjanja" className="footer__link">GitHub</a></li>
                <li className="footer__list-item link-effect"><a href="https://github.com/bodjanja" className="footer__link">Telegram</a></li>
            </ul>
        </footer>
    )
}