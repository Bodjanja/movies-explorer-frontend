import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
    return(
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <p className="about-project__paragraph">Дипломный проект включал 5 этапов<span className="about-project__paragraph_span about-project__paragraph_span-expander">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</span></p>
            <p className="about-project__paragraph">На выполнение диплома ушло 5 недель<span className="about-project__paragraph_span">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</span></p>
            <div className="about-project__stats">
                <div className="about-project__stats_backend">1 неделя</div>
                <div className="about-project__stats_frontend">4 недели</div>
                <div className="about-project__stats_info">Back-End</div>
                <div className="about-project__stats_info">Front-End</div>
            </div>
        </section>
    )
}