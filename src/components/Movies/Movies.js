import React from "react";
import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { ScreenWidthContext } from "../../contexts/Contexts";
import { useContext } from "react/cjs/react.production.min";

export default function Movies(props){

    const InitialCount = 7;

    const [searchRequest, setSearchRequest] = React.useState(null);
    const [moviesToRender, setMoviesToRender] = React.useState(props.allMovies);
    const [resultsNotFound, setResultsNotFound] = React.useState(false);
    const [currentRenderCount, setCurrentRenderCount] = React.useState(InitialCount);

    const toShowMoreButton = currentRenderCount !== moviesToRender.length;

    function handleSearchRequestForMovies(request) {
        setSearchRequest(request);
    }

    const innerWidth = React.useContext(ScreenWidthContext);

    function showMore() {
        innerWidth > 1023
        ?
        setCurrentRenderCount((prev) => {
            const totalMovies = moviesToRender.length;

            if(prev >= totalMovies){
                return prev;
            }else if(prev + 7 > totalMovies){
                setCurrentRenderCount(totalMovies);
            }else{
                setCurrentRenderCount(prev + 7);
            }
        })
        :
        setCurrentRenderCount((prev) => {
            const totalMovies = moviesToRender.length;

            if(prev >= totalMovies){
                return prev;
            }else if(prev + 5 > totalMovies){
                setCurrentRenderCount(totalMovies);
            }else{
                setCurrentRenderCount(prev + 5);
            }
        })
    }

    React.useEffect(() => {
        //Убрать после ревью, чтобы при загрузке сразу подгружались все карточки
        if(!searchRequest){
            return setMoviesToRender([]);
        }

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

    React.useEffect(() => {
        innerWidth > 1023
        ?
        setCurrentRenderCount(moviesToRender.length > 7 ? 7 : moviesToRender.length)
        :
        setCurrentRenderCount(moviesToRender.length > 5 ? 5 : moviesToRender.length)
    }, [moviesToRender]);

    return(
        <>
            <main className="movies__container">
                <div className="movies__subcontainer">
                    <SearchForm
                    onSearchRequestForMovies={handleSearchRequestForMovies}
                    filterMovies={props.filterMovies} />
                    <MoviesCardList>
                    {moviesToRender.slice(0, currentRenderCount).map((movie, i) => (
                        <MoviesCard key={i}
                        movie={movie}
                        onLike={props.onSaveMovie}
                        savedMovies={props.savedMovies} />
                    ))}
                    {resultsNotFound ? <div>Ничего не найдено</div> : ''}
                    </MoviesCardList>
                </div>
                {toShowMoreButton  && <button className="movies__expander-button" onClick={showMore}>Ещё</button>}
            </main>
        </>
    )
}