import React from "react";
import { Link } from 'react-router-dom';
import headerLogo from "../../images/logoHeader.svg";
import "./NavTab.css";
import { useLocation } from "react-router-dom";

export default function Promo() {

    const location = useLocation();

    let style = '';

    if(location.pathname === '/'){
        style = "navtab navtab_unlogged";
    } else if(location.pathname === '/sign-in' || '/sign-up'){
        style = "navtab_hidden"
    } else{
        style = "navtab"
    }

    return(
        <div className={style}>
            <img src={headerLogo} alt='Логотип' />
            <div className="navtab__container">
                    <Link to="/sign-up" className="main__links navtab__link-margin link-effect">Регистрация</Link>
                    <Link to="/sign-in" className="main__links navtab__link link-effect">Войти</Link>
            </div>
        </div>
    )
}