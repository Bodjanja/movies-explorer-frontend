import React from "react";
import "./Unfound.css";
import { useHistory } from "react-router-dom";

export default function Unfound() {

    const history = useHistory();

    function redirect() {
        history.go(-2)
    }

    return(
        <div className="unfound__container">
            <h1 className="unfound__title">404</h1>
            <p className="unfound__subtitle">Страница не найдена</p>
            <button onClick={redirect} className="unfound__link link-effect">Назад</button>
        </div>
    )
}