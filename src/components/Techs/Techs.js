import React from "react";
import "./Techs.css";
import "../AboutProject/AboutProject.css";
import "../Promo/Promo.css";

export default function Techs() {
    return(
        <section className="techs">
        <h2 className="about-project__title techs__title-align">Технологии</h2>
        <h3 className="promo__title techs__title" style={{textAlign: 'center'}}>7 технологий</h3>
        <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>HTML</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>CSS</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>JS</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>React</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>Git</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>Express.js</p></li>
            <li className="techs__tech"><p style={{margin: 'auto', padding: 0}}>mongoDB</p></li>
        </ul>
    </section>
    )
}