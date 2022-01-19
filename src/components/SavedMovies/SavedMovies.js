import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
import Footer from "../Footer/Footer";
import PopupHeader from "../PopupHeader/PopupHeader";

export default function SavedMovies(props) {
    return(
        <>
            <Header menuOpener={props.menuOpener} menuCloser={props.menuCloser} />
            <main>
                <SearchForm />
                {props.likedMovies.map((movie, i) => (
                    <MoviesCardList key={i} component={MoviesCardSaved} movie={movie} />
                ))}
            </main>
            <Footer />
            <PopupHeader menuOpen={props.menuOpen} menuCloser={props.menuCloser} />
        </>
    )
}