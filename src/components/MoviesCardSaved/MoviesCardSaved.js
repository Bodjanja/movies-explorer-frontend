import React from "react";
import "../MoviesCard/MoviesCard.css";
import "./MoviesCardSaved.css";

export default function MoviesCardSaved(props) {

    return(
        <li className='movie__container'>
            <h2 className='movie__title'>{props.movie.name}</h2>
            <p className='movie__duration'>{props.movie.length}</p>
            <button className='movie__like-button saved-movie__remove-button'></button>
            <img src={props.movie.image} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}