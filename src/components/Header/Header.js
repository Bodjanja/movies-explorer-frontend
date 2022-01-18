import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import headerLogo from '../../images/logoHeader.svg';
import Navigation from "../Navigation/Navigation";

export default function Header(props){
    return(
        <div className='header'>
            <Link to="/"><img src={headerLogo} alt='Логотип'/></Link>
            <button className='header__menu-burger' onClick={props.menuOpener} />
            <div className="navigation">
                <Navigation menuCloser={props.menuCloser} />
            </div>
        </div>
    )
}