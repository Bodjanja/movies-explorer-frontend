import React from "react";
import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies(props){

    const [searchRequest, setSearchRequest] = React.useState(null);
    const [moviesToRender, setMoviesToRender] = React.useState(props.allMovies);
    const [resultsNotFound, setResultsNotFound] = React.useState(false);

    function handleSearchRequestForMovies(request) {
        setSearchRequest(request);
    }

    React.useEffect(() => {
        if(!searchRequest && props.shortMoviesFiltered === false) {
            setMoviesToRender(props.allMovies)
            return
        }else if(!searchRequest && props.shortMoviesFiltered === true) {
            const shortMovies = props.allMovies.filter(function(i) {
                  if(i.duration<41){
                    return i
                  }
                }
                )
            setMoviesToRender(shortMovies)
            return
        };
        if(searchRequest && props.shortMoviesFiltered === false){
            const filteredMovies = props.allMovies.filter(
                m => m.nameRU.includes(searchRequest)
            );
            filteredMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            setMoviesToRender(filteredMovies);
        }else if(searchRequest && props.shortMoviesFiltered === true){
            const filteredMovies = props.allMovies.filter(
                m => m.nameRU.includes(searchRequest)
            );

            const shortMovies = filteredMovies.filter(function(i) {
                if(i.duration<41){
                  return i
                }
              })
              
            shortMovies.length === 0 ? setResultsNotFound(true) : setResultsNotFound(false);
            
            setMoviesToRender(shortMovies);
        }
    }, [searchRequest, props.shortMoviesFiltered])
    return(
        <>
            <main className="movies__container">
                <div className="movies__subcontainer">
                    <SearchForm
                    onSearchRequestForMovies={handleSearchRequestForMovies}
                    filterMovies={props.filterMovies} />
                    <MoviesCardList>
                    {moviesToRender.map((movie, i) => (
                        <MoviesCard key={i}
                        movie={movie}
                        onLike={props.onSaveMovie}
                        savedMovies={props.savedMovies} />
                    ))}
                    {resultsNotFound ? <div>Ничего не найдено</div> : ''}
                    </MoviesCardList>
                </div>
                <button className="movies__expander-button">Ещё</button>
            </main>
        </>
    )
}