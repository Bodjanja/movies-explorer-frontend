import React from "react";
import { Link } from 'react-router-dom';
import headerLogo from "../../images/logoHeader.svg";
import "./NavTab.css";

export default function Promo() {
    return(
        <div className="navtab">
            <img src={headerLogo} alt='Логотип' />
            <div className="navtab__container">
                    <Link to="/sign-up" className="main__links navtab__link-margin link-effect">Регистрация</Link>
                    <Link to="/sign-in" className="main__links navtab__link link-effect">Войти</Link>
            </div>
        </div>
    )
}