import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";

export default function SavedMovies(props) {

    const [searchRequest, setSearchRequest] = React.useState(null);
    const [moviesToRender, setMoviesToRender] = React.useState(props.savedMovies);
    const [resultsNotFound, setResultsNotFound] = React.useState(false);

    function handleSearchRequestForSavedMovies(request) {
        setSearchRequest(request);
    }

    React.useEffect(() => {
        if(!searchRequest && props.shortSavedMoviesFiltered === false) {
            setMoviesToRender(props.savedMovies)
            props.savedMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            return;
        }else if(!searchRequest && props.shortSavedMoviesFiltered === true) {
            const shortMovies = props.savedMovies.filter(function(i) {
                  if(i.duration<41){
                    return i;
                  }
                }
                )
            shortMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            setMoviesToRender(shortMovies)
            return;
        };
        if(searchRequest && props.shortSavedMoviesFiltered === false){
            const filteredMovies = props.savedMovies.filter(
                m => m.nameRU.includes(searchRequest)
            );

        filteredMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
        setMoviesToRender(filteredMovies);
        }else if(searchRequest && props.shortSavedMoviesFiltered === true){
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
    }, [searchRequest, props.shortSavedMoviesFiltered, props.savedMovies])
    
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