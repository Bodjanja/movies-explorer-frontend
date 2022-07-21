import React from "react";
import "./Portfolio.css";
import "../Techs/Techs.css";
import "../Main/Main.css";
import arrow from "../../images/arrow.svg";
import { Link } from "react-router-dom";

export default function Portfolio() {
    return(
        <>
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="techs__list portfolio__list">
                <li><Link target="_blank" className="main__links link-effect portfolio__list-link portfolio__list-link_line" to={{pathname: "https://bodjanja.github.io/how-to-learn/index.html"}} rel="noreferrer"><p className="portfolio__list-item">Статичный сайт</p><img className="portfolio__link-icon" src={arrow} alt="Стрелка" /></Link></li>
                <li><Link target="_blank" className="main__links link-effect portfolio__list-link portfolio__list-link_line" to={{pathname: "https://bodjanja.github.io/russian-travel/index.html"}} rel="noreferrer"><p className="portfolio__list-item">Адаптивный сайт</p><img className="portfolio__link-icon" src={arrow} alt="Стрелка" /></Link></li>
                <li><Link target="_blank" className="main__links link-effect portfolio__list-link" to={{pathname: "https://bodjanja.github.io/react-mesto-auth/"}} rel="noreferrer"><p className="portfolio__list-item">Одностраничное приложение</p><img src={arrow} className="portfolio__link-icon" alt="Стрелка" /></Link></li>
            </ul>
        </>
    )
}