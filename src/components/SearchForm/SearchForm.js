import React from "react";
import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';

export default function SearchForm(props) {

    const [value, setValue] = React.useState(localStorage.getItem('searchRequest' || ''));

    React.useEffect(() => {
        props.onSearchRequest(value);
    })

    function handleChange(e) {
        const v = e.target.value;
        setValue(v);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onSearchRequest(value);
        localStorage.setItem('searchRequest', value);
    }

    return(
            <div className='search'>
                <form className='search__form' onSubmit={handleSubmit} noValidate>
                    <div className='search__input-film'>
                        <img src={searchIcon} className='search__icon' alt='Иконка поиска' />
                        <input name='film' value={value} onChange={handleChange} placeholder='Название фильма' className='search__input xxx' required></input>
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