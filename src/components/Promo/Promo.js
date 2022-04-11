import React from "react";
import "./Promo.css";
import "../Main/Main.css";
import { Link } from 'react-router-dom';
import landingLogo from "../../images/landingBodyLogo.svg";
import NavTab from "../NavTab/NavTab"

export default function Promo() {
    return(
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div>
            <img className="promo__picture" src={landingLogo} alt="Логотип" />
            <Link className="main__links promo__link link-effect" to="/sign-up">Узнать больше</Link>
        </section>
    )
}