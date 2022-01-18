import React from "react";
import "./AboutMe.css";
import "../AboutProject/AboutProject.css";
import "../Promo/Promo.css";
import "../Techs/Techs.css";
import "../Main/Main.css";
import profilePic from "../../images/profilePic.svg";
import Portfolio from "../Portfolio/Portfolio";

export default function AboutMe() {
    return(
        <section className="about-me">
                <h2 className="about-project__title">Студент</h2>
                <div className="about-me__container">
                    <img className="about-me__picture" src={profilePic} alt="Фото профиля" />
                    <div className="about-me__subcontainer">
                        <div>
                            <h3 className="promo__title about-me__title" style={{marginBottom: 18}}>Дмитрий</h3>
                            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
                            <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        </div>
                        <ul className="techs__list about-me__list">
                            <li><a className="main__links about-me__links link-effect" href="https://github.com/bodjanja">Telegram</a></li>
                            <li><a className="main__links about-me__links link-effect" href="https://github.com/bodjanja">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <Portfolio />
            </section>
    )
}