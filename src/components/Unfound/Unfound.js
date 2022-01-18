import React from "react";
import "./Unfound.css";
import { useNavigate } from "react-router-dom";

export default function Unfound() {

    const navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return(
        <div className="unfound__container">
            <h1 className="unfound__title">404</h1>
            <p className="unfound__subtitle">Страница не найдена</p>
            <a className="unfound__link link-effect" onClick={goBack}>Назад</a>
        </div>
    )
}