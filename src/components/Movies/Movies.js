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
            <main className="movies__container">
                <div className="movies__subcontainer">
                    <SearchForm filterMovies={props.filterMovies} allMovies={props.allMovies} />
                    {props.allMovies.map((movie, i) => (
                        <MoviesCardList key={i} component={MoviesCard} movie={movie} getTimeFromMins={props.getTimeFromMins} setSavedMovies={props.setSavedMovies} savedMovies={props.savedMovies} renderCards={props.renderCards} />
                    ))}
                </div>
                <button className="movies__expander-button">Ещё</button>
            </main>
            <Footer />
            <PopupHeader menuOpen={props.menuOpen} menuCloser={props.menuCloser} />
        </>
    )
}