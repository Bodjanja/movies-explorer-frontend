import React from "react";
import './SearchForm.css'
import searchIcon from '../../images/searchIcon.svg'

export default function SearchForm() {
    return(
            <div className='search'>
                <form className='search__form'>
                    <div className='search__input-film'>
                        <img src={searchIcon} className='search__icon' alt='Иконка поиска' />
                        <input name='film' placeholder='Название фильма' className='search__input' required></input>
                    </div>
                    <div className="search__button-container">
                        <button type="submit" className='search__button link-effect'></button>
                    </div>
                    <div className="search__radio-container">
                        <input name='short' type="checkbox" id='shortFilms'></input>
                        <label htmlFor='shortFilms' className='search__input-label'>Короткоментажки</label>
                    </div>
                </form>
            </div>
    )
}