import React from "react";
import "./MoviesCard.css";
import mainApi from "../../utils/MainApi";

export default function MoviesCard(props) {

  const [cardLikeStatus, setCardLikeStatus] = React.useState()

  React.useEffect(() => {
    const movie = props.movie;
    const isLiked = props.savedMovies.some(i => i.movieId === movie.id.toString())//Проверяем по ID есть ли уже в массиве savedMovies фильм который мы лайкаем
    setCardLikeStatus(isLiked)
  }, [props.movie, props.savedMovies])
// console.log(props.savedMovies)

    const handleCardLike = () => {
        // setCardLikeStatus(!cardLikeStatus)//Проверяем лайкнут ли фильм, чтобы потом отправить запрос в API на лайк или его удаление
        // console.log(cardLikeStatus)
        if(!cardLikeStatus){
        mainApi.createMovie(props.movie)
        .then((savedMovie) => {
            props.setSavedMovies([savedMovie.data, ...props.savedMovies])
        })
        .catch((err) => {
          console.log(err);
           });
          }else{
            const movieToDeleteFromSaved = props.savedMovies.find(i => i.movieId === props.movie.id.toString())//Ищем по мануальному ID в массиве SavedMovies фильм, по которому нажали, чтобы извлечь его серверное ID и отправить запрос на удаление
            // console.log(movieToDeleteFromSaved._id)
            console.log(movieToDeleteFromSaved)
            mainApi.deleteSavedMovie(movieToDeleteFromSaved._id)
            .then(() => {
            })
            .catch((err) => {
                console.log(err)
            })
            setCardLikeStatus(false)
            console.log(props.savedMovies)
            props.renderCards();
          }
      }

    return(
        <li className='movie__container'>
            <h2 className='movie__title'>{props.movie.nameRU}</h2>
            <p className='movie__duration'>{props.getTimeFromMins(props.movie.duration)}</p>
            <button className={`movie__like-button ${cardLikeStatus ? 'movie__like-button_active' : 'movie__like-button_inactive'}`} onClick={handleCardLike}></button>
            <img src={`${'https://api.nomoreparties.co'}${props.movie.image.url}`} className='movie__picture' alt='Картинка фильма' />
        </li>
    )
}