import React from "react";
import "./MoviesCard.css";
import mainApi from "../../utils/MainApi";
import {getTimeFromMins} from "../../utils/formatTime";

export default function MoviesCard(props) {

  const isLiked = props.savedMovies.some(i => i.movieId === props.movie.id.toString());

    return(
        <li className='movie__container'>
            <h2 className='movie__title'>{props.movie.nameRU}</h2>
            <p className='movie__duration'>{getTimeFromMins(props.movie.duration)}</p>
            <button className={`movie__like-button ${isLiked ? 'movie__like-button_active' : 'movie__like-button_inactive'}`}onClick={() => props.onLike(props.movie, !isLiked)}></button>
            <img src={`${'https://api.nomoreparties.co'}${props.movie.image.url}`} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}