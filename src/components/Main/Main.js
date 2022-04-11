import React from "react";
import { Link } from 'react-router-dom';
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";

export default function Main(props) {
    return(
        <div>
            <Promo loggedIn={props.loggedIn} />
            <AboutProject />
            <Techs />
            <AboutMe />
        </div>
    )
}