import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
import Footer from "../Footer/Footer";
import PopupHeader from "../PopupHeader/PopupHeader";

export default function SavedMovies(props) {
    
    return(
            <main>
                <SearchForm />
                <MoviesCardList>
                {props.savedMovies.map((movie, i) => (
                    <MoviesCardSaved key={i}
                    onLike={props.onSaveMovie}
                    movie={movie}
                    savedMovies={props.savedMovies} />
                ))}
                </MoviesCardList>
            </main>
    )
}