import React from "react";
import "../MoviesCard/MoviesCard.css";
import "./MoviesCardSaved.css";
import mainApi from "../../utils/MainApi";
import {getTimeFromMins} from "../../utils/formatTime";

export default function MoviesCardSaved(props) {

    function handleCardRemove() {
        props.movie.id = props.movie.movieId;
        props.onLike(props.movie, false);
    }

    function handleCardClick(e) {
        if(e.target.className.includes('movie__like-button')){
            return;
        } else{
            window.location.href = props.movie.trailer;
        }
    }

    return(
        <li className='movie__container'  onClick={handleCardClick}>
            <h2 className='movie__title'>{props.movie.nameRU}</h2>
            <p className='movie__duration'>{getTimeFromMins(props.movie.duration)}</p>
            <button className='movie__like-button saved-movie__remove-button' onClick={handleCardRemove}></button>
            <img src={props.movie.image} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}