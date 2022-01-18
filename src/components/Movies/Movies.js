import React from "react";
import './Movies.css'
import Header from "../Header/Header"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import PopupHeader from "../PopupHeader/PopupHeader";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies(props){
    return(
        <>
            <Header menuOpener={props.menuOpener} />
            <div className="movies__container">
                <div className="movies__subcontainer">
                    <SearchForm />
                    {props.allMovies.map((movie, i) => (
                        <MoviesCardList key={i} component={MoviesCard} movie={movie} />
                    ))}
                </div>
                <button className="movies__expander-button">Ещё</button>
            </div>
            <Footer />
            <PopupHeader menuOpen={props.menuOpen} menuCloser={props.menuCloser} />
        </>
    )
}