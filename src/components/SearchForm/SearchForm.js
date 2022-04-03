import React from "react";
import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';

export default function SearchForm(props) {

    
    function handleSubmit(e) {
        e.preventDefault();
        let shortMovies = []
        const movieName = console.log(document.querySelector('.xxx').value)

        shortMovies = props.allMovies.filter(function(i) {
            if(i.duration<41){
              return i
            }
          }
          )
          props.allMovies.splice(0, props.allMovies.length)
        //   props.allMovies.push(shortMovies)
        shortMovies.forEach((i) => {
            props.allMovies.push(i)
        })
          console.log(props.allMovies)
          console.log(shortMovies)
    }

    return(
            <div className='search'>
                <form className='search__form' onSubmit={handleSubmit}>
                    <div className='search__input-film'>
                        <img src={searchIcon} className='search__icon' alt='Иконка поиска' />
                        <input name='film' placeholder='Название фильма' className='search__input xxx' required></input>
                    </div>
                    <div className="search__button-container">
                        <button type="submit" className='search__button link-effect'></button>
                    </div>
                    <div className="search__radio-container">
                        <input name='short' type="checkbox" id='shortFilms' onClick={props.filterMovies}></input>
                        <label htmlFor='shortFilms' className='search__input-label'>Короткоментажки</label>
                    </div>
                </form>
            </div>
    )
}