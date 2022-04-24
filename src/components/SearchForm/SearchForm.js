import React from "react";
import './SearchForm.css';
import { useLocation } from "react-router-dom";
import searchIcon from '../../images/searchIcon.svg';

export default function SearchForm(props) {

    const [value, setValue] = React.useState(localStorage.getItem('searchRequest' || ''));
    const [valueSaved, setValueSaved] = React.useState(localStorage.getItem('searchRequestSaved' || ''));

    const location = useLocation();
//Использхуем location для того, чтобы осуществлять параллельный поиск фильмов и параллельную работу со стейтами, чтобы результаты поиска не смешивались, а разделялись между страницами /movies и /saved-movies
    React.useEffect(() => {
        if(location.pathname === '/movies'){
            props.onSearchRequestForMovies(value);
        }else{
            props.onSearchRequestForSavedMovies(valueSaved);
        }
    })

    function handleChange(e) {
        const v = e.target.value;
        if(location.pathname === '/movies'){
            setValue(v);
        }else{
            setValueSaved(v)
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if(location.pathname === '/movies'){
            localStorage.setItem('searchRequest', value);
            props.onSearchRequestForMovies(value);
        }else{
            localStorage.setItem('searchRequestSaved', valueSaved);
            props.onSearchRequestForSavedMovies(valueSaved);
        }
    }

    return(
            <div className='search'>
                <form className='search__form' onSubmit={handleSubmit} noValidate>
                    <div className='search__input-film'>
                        <img src={searchIcon} className='search__icon' alt='Иконка поиска' />
                        <input name='film' value={location.pathname === '/movies' ? value : valueSaved} onChange={handleChange} placeholder='Название фильма' className='search__input xxx' required></input>
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