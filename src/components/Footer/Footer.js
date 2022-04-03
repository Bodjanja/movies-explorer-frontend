import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <p className="footer__copyright">&#169; 2021</p>
            <ul className="footer__list">
                <li className="footer__list-item link-effect"><Link to={{pathname: "https://practicum.yandex.ru"}} className="footer__link">Яндекс.Практикум</Link></li>
                <li className="footer__list-item link-effect"><Link to={{pathname: "https://github.com/bodjanja"}} className="footer__link">GitHub</Link></li>
                <li className="footer__list-item link-effect"><Link to={{pathname: "https://github.com/bodjanja"}} className="footer__link">Telegram</Link></li>
            </ul>
        </footer>
    )
}