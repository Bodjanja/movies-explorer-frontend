import React from "react";
import "../MoviesCard/MoviesCard.css";
import "./MoviesCardSaved.css";
import mainApi from "../../utils/MainApi";

export default function MoviesCardSaved(props) {

    function handleCardRemove() {
        mainApi.deleteSavedMovie(props.movie._id)
        .then(() => {
            const restSavedMovies = props.savedMovies.filter((item) => {
                return props.movie._id !== item._id;
              });
              props.setSavedMovies(restSavedMovies);
        })
    }

    return(
        <li className='movie__container'>
            <h2 className='movie__title'>{props.movie.nameRU}</h2>
            <p className='movie__duration'>{props.getTimeFromMins(props.movie.duration)}</p>
            <button className='movie__like-button saved-movie__remove-button' onClick={handleCardRemove}></button>
            <img src={props.movie.image} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}