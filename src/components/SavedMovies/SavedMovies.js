import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
import Footer from "../Footer/Footer";
import PopupHeader from "../PopupHeader/PopupHeader";

export default function SavedMovies(props) {

    const [searchRequest, setSearchRequest] = React.useState(null);
    const [moviesToRender, setMoviesToRender] = React.useState(props.savedMovies);
    const [resultsNotFound, setResultsNotFound] = React.useState(false);

    function handleSearchRequestForSavedMovies(request) {
        setSearchRequest(request);
    }

    React.useEffect(() => {
        if(!searchRequest && props.shortMoviesFiltered === false) {
            setMoviesToRender(props.savedMovies)
            props.savedMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            return
        }else if(!searchRequest && props.shortMoviesFiltered === true) {
            const shortMovies = props.savedMovies.filter(function(i) {
                  if(i.duration<41){
                    return i
                  }
                }
                )
            shortMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            setMoviesToRender(shortMovies)
            return
        };
        if(searchRequest && props.shortMoviesFiltered === false){
            const filteredMovies = props.savedMovies.filter(
                m => m.nameRU.includes(searchRequest)
            );

        filteredMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
        setMoviesToRender(filteredMovies);
        }else if(searchRequest && props.shortMoviesFiltered === true){
            const filteredMovies = props.savedMovies.filter(
                m => m.nameRU.includes(searchRequest)
            );
            const shortMovies = filteredMovies.filter(function(i) {
                if(i.duration<41){
                  return i
                }
              }
              )
            shortMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            setMoviesToRender(shortMovies);
        }
    }, [searchRequest, props.shortMoviesFiltered])
    
    return(
            <main>
                <SearchForm
                onSearchRequestForSavedMovies={handleSearchRequestForSavedMovies}
                filterMovies={props.filterMovies} />
                <MoviesCardList>
                {moviesToRender.map((movie, i) => (
                    <MoviesCardSaved key={i}
                    onLike={props.onSaveMovie}
                    movie={movie}
                    savedMovies={props.savedMovies} />
                ))}
                {resultsNotFound ? <div>Ничего не найдено</div> : ''}
                </MoviesCardList>
            </main>
    )
}