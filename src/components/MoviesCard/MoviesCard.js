import React from "react";
import "./MoviesCard.css"

export default function MoviesCard(props) {
    return(
        <li className='movie__container'>
            <h2 className='movie__title'>{props.movie.name}</h2>
            <p className='movie__duration'>{props.movie.length}</p>
            <button className={`movie__like-button ${props.movie.liked ? 'movie__like-button_active' : ''}`}></button>
            <img src={props.movie.image} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}