import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from "../../contexts/CurrentUserContext" 

import mainApi from '../../utils/MainApi';


function App() {

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shortMoviesFiltered, setShortMoviesFiltered] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);


  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if(loggedIn){
    mainApi.getUserData()
      .then((user) => {
        // console.log(user)
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
      }}, [loggedIn]);
//sojedenitj, header dlja Promo

function renderCards() {
  mainApi.getMovies()
      .then((movies) => {
        // console.log(movies.data)
        // console.log(currentUser._id)
        const ownSavedMovies = [];
        movies.data.forEach((movie) => {
          // console.log(movie)
          if(movie.owner === currentUser._id){
            ownSavedMovies.push(movie)
            setSavedMovies(ownSavedMovies)
          }
        })
      })
      .catch((err) => {
        console.log(err);
      });
}

  React.useEffect(() => {
    if(loggedIn === true) {
      renderCards();
    }
  }, [currentUser])
console.log(savedMovies)
  React.useEffect(() => {
    moviesApi.getInitialMovies()
    .then((movies) => {
      setAllMovies(movies)
    })
  }, [])

  // console.log(allMovies)

  // const shortMovies = allMovies.filter(function(i) {
  //   if(i.duration<41){
  //     return i
  //   }
  // }
  // )
  // console.log(shortMovies)

  function tokenCheck(){
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      mainApi.checkToken(token)
      .then((res) => {
        if(res.data !== null){
          setLoggedIn(true)
          setCurrentUser(res.data)
          history.push(location.pathname)
          }
      })
      .catch((err) => console.log(err));
      }
  }

  const getTimeFromMins = (time) => {
    let hours = Math.trunc(time/60);
    let minutes = time % 60;
    return hours + 'ч ' + minutes + 'мин';
};

  function filterMovies() {
    setShortMoviesFiltered(!shortMoviesFiltered)
  }

  function menuOpener() {
    setMenuOpen(true)
}

function menuCloser() {
    setMenuOpen(false)
}
// console.log(loggedIn)
// console.log(savedMovies)
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Switch>
        <Route path="/sign-up">
          <Register setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
        </Route>
        
        <Route path="/sign-in">
          <Login setLoggedIn={setLoggedIn} />
        </Route>

        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>

        <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} allMovies={allMovies} filterMovies={filterMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} getTimeFromMins={getTimeFromMins} renderCards={renderCards} />

        <ProtectedRoute path="/saved-movies" component={SavedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} loggedIn={loggedIn} menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} getTimeFromMins={getTimeFromMins} />

        <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} setSavedMovies={setSavedMovies} />
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
