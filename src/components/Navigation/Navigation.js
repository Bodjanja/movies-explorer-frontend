import React from "react";
import { NavLink, Link } from "react-router-dom"
import './Navigation.css';
import accountIcon from '../../images/accountIcon.svg';
import { useMediaPredicate } from "react-media-hook";


export default function Navigation(props) {

    const isNotDesktop = useMediaPredicate("(max-width: 1023px)");

    return(
        <div className="navigation__container">
            <nav className='navigation__subcontainer'>
                {isNotDesktop ? <NavLink className='navigation__links link-effect' activeClassName="navigation__links_active-mobile" onClick={props.menuCloser} to='/movies'>Фильмы</NavLink> : <NavLink className='navigation__links link-effect' activeClassName="navigation__links_active-desktop" onClick={props.menuCloser} to='/movies'>Фильмы</NavLink>}
                {isNotDesktop ? <NavLink className='navigation__links link-effect' activeClassName="navigation__links_active-mobile" onClick={props.menuCloser} to='/saved-movies'>Сохранённые фильмы</NavLink> : <NavLink className='navigation__links link-effect' activeClassName="navigation__links_active-desktop" onClick={props.menuCloser} to='/saved-movies'>Сохранённые фильмы</NavLink>}
            </nav>
            <Link className='navigation__account-link link-effect' onClick={props.menuCloser} to="/profile">Аккаунт
                <img src={accountIcon} className='navigation__account-icon' alt='Иконка аккаунта' />
            </Link>
        </div>
    )
}