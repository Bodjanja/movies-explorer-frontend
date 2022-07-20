import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PopupHeader from '../PopupHeader/PopupHeader';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Unfound from '../Unfound/Unfound';

import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext, ScreenWidthContext } from "../../contexts/Contexts" 

import mainApi from '../../utils/MainApi';


function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shortMoviesFiltered, setShortMoviesFiltered] = React.useState(false);
  const [shortSavedMoviesFiltered, setShortSavedMoviesFiltered] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState(null);
  const loggedIn = !!currentUser;
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);


  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
    })
}, [])

  React.useEffect(() => {
    if(loggedIn === true) {
      loadLikedMovies();
    }
  }, [loggedIn])

  React.useEffect(() => {
    if(loggedIn){
      const localMovies = localStorage.getItem('allMovies')
      if(localMovies) {
        setAllMovies(JSON.parse(localMovies));
        return;
      }

      moviesApi.getInitialMovies()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem('allMovies', JSON.stringify(movies));
      })
  }
  }, [loggedIn])
  console.log(localStorage)

  function loadLikedMovies() {
    mainApi.getMovies()
      .then((movies) => {
        const ownSavedMovies = [];
        movies.data.forEach((movie) => {
          if(movie.owner === currentUser._id){
            ownSavedMovies.push(movie)
          }
        })
        setSavedMovies(ownSavedMovies)
      })
      .catch((err) => {
        console.log(err);
      });
}

  function tokenCheck(){

    let token = localStorage.getItem('token')

    if(!token){
      setIsLoading(false)
        return;
      }

    mainApi.checkToken(token)
      .then((res) => {
        if(res.data !== null){
          setCurrentUser(res.data)
          history.push(location.pathname)
          }
      })
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading(false)
      })
  }

function handleLoginSuccess() {
  mainApi.getUserData()
      .then((user) => {
        setCurrentUser(user.data);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
}

function handleSignOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('allMovies');
  setCurrentUser(null);
  setSavedMovies([]);
  history.push('/');
}

function handleSaveMovie(movie, toSave) {
  //Проверяем лайкнут ли фильм, чтобы потом отправить запрос в API на лайк или его удаление
    if(toSave){
    mainApi.createMovie(movie)
    .then((savedMovie) => {
        setSavedMovies([savedMovie.data, ...savedMovies])
    })
    .catch((err) => {
      console.log(err);
       });
      }else{
        const movieToDeleteFromSaved = savedMovies.find(i => i.movieId === movie.id.toString())//Ищем по мануальному ID в массиве SavedMovies фильм, по которому нажали, чтобы извлечь его серверное ID и отправить запрос на удаление
        mainApi.deleteSavedMovie(movieToDeleteFromSaved._id)
        .then(() => {
          const newSavedMovies = savedMovies.filter(
            savedMovie => savedMovie._id !== movieToDeleteFromSaved._id
          );
          setSavedMovies(newSavedMovies);
        })
        .catch((err) => {
            console.log(err)
        })
      }
}

function handleUpdateUser(user) {
  setCurrentUser(user)
}

function filterMovies() {
  if(location.pathname === '/movies'){
        setShortMoviesFiltered(!shortMoviesFiltered)
    if(!localStorage.getItem('radioButton')){
        localStorage.setItem('radioButton', 'clicked');
    }else if(localStorage.getItem('radioButton') === 'clicked'){
        localStorage.removeItem('radioButton')
    }
}else{
    setShortSavedMoviesFiltered(!shortSavedMoviesFiltered)
    if(!localStorage.getItem('radioButtonSavedMovies')){
        localStorage.setItem('radioButtonSavedMovies', 'clicked');
    }else if(localStorage.getItem('radioButtonSavedMovies') === 'clicked'){
        localStorage.removeItem('radioButtonSavedMovies')
  }
}
}

  function menuOpener() {
    setMenuOpen(true)
}

function menuCloser() {
    setMenuOpen(false)
}


if(isLoading) {
  return 'Loading'
}

  return (
    <ScreenWidthContext.Provider value={innerWidth}>
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      {loggedIn ? <Header menuOpener={menuOpener} /> : <NavTab />}
      <Switch>
        <Route path="/sign-up">
        {loggedIn ? <Redirect to="/movies" /> :
          <Register onRegisterSuccess={handleLoginSuccess} />
        }
        </Route>
        
        <Route path="/sign-in">
        {loggedIn ? <Redirect to="/movies" /> :
          <Login onLoginSuccess={handleLoginSuccess} />
        }
        </Route>

        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>

        <ProtectedRoute path="/movies" component={Movies}
        loggedIn={loggedIn}
        allMovies={allMovies}
        filterMovies={filterMovies}
        savedMovies={savedMovies}
        onSaveMovie={handleSaveMovie}
        shortMoviesFiltered={shortMoviesFiltered} />

        <ProtectedRoute path="/saved-movies" component={SavedMovies}
        savedMovies={savedMovies}
        filterMovies={filterMovies}
        loggedIn={loggedIn}
        onSaveMovie={handleSaveMovie}
        shortSavedMoviesFiltered={shortSavedMoviesFiltered} />

        <ProtectedRoute path="/profile" component={Profile}
        loggedIn={loggedIn}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        resetSavedMovies={setShortSavedMoviesFiltered}
        resetMovies={setShortMoviesFiltered}
        onSignOut={handleSignOut} />

        <Route path="*">
          <Unfound />
        </Route>

      </Switch>
      <Footer />
      <PopupHeader
        menuOpen={menuOpen}
        menuCloser={menuCloser} />
    </div>
    </CurrentUserContext.Provider>
    </ScreenWidthContext.Provider>
  );
}

export default App;
