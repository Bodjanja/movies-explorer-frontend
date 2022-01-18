import React from "react"
import { Link } from 'react-router-dom'
import '../Header/Header.css'
import './PopupHeader.css'
import Navigation from "../Navigation/Navigation";
import "../Navigation/Navigation.css";

export default function PopupHeader(props){
    return(
        <div className={`${props.menuOpen ? 'popup' : 'popup-header_closed'}`}>
        <div className={`popup__header ${props.menuOpen ? 'popup-header_opened' : 'popup-header_closed'}`}>
            <button className='popup-header__close-button' onClick={props.menuCloser}></button>
            <div className='popup-header__subcontainer'>
                <Link className='navigation__links link-effect' to='/'>Главная</Link>
                <Navigation menuCloser={props.menuCloser} />
            </div>
        </div>
        </div>
    )
}