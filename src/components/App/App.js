import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

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

import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from "../../contexts/CurrentUserContext" 

import mainApi from '../../utils/MainApi';


function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shortMoviesFiltered, setShortMoviesFiltered] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState(null);
  const loggedIn = !!currentUser;


  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  // React.useEffect(() => {
  //   if(loggedIn){
  //   mainApi.getUserData()
  //     .then((user) => {
  //       // console.log(user)
  //       setCurrentUser(user.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     }}, [loggedIn]);
//sojedenitj, header dlja Promo

  React.useEffect(() => {
    if(loggedIn === true) {
      loadLikedMovies();
    }
  }, [loggedIn])

// console.log(currentUser)

  React.useEffect(() => {

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
  }, [])

  function loadLikedMovies() {
  mainApi.getMovies()
      .then((movies) => {
        // console.log(movies.data)
        // console.log(currentUser._id)
        const ownSavedMovies = [];
        movies.data.forEach((movie) => {
          // console.log(movie)
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

  // console.log(allMovies)

  // const shortMovies = allMovies.filter(function(i) {
  //   if(i.duration<41){
  //     return i
  //   }
  // }
  // )
  // console.log(shortMovies)

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
        // console.log(movieToDeleteFromSaved._id)
        console.log(movieToDeleteFromSaved)
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
        // setCardLikeStatus(false)
        // console.log(props.savedMovies)
        // props.renderCards();
      }
}

function handleUpdateUser(user) {
  setCurrentUser(user)
}

  function filterMovies() {
    setShortMoviesFiltered(!shortMoviesFiltered)
  }
console.log(shortMoviesFiltered)
  function menuOpener() {
    setMenuOpen(true)
}

function menuCloser() {
    setMenuOpen(false)
}
// console.log(loggedIn)
// console.log(savedMovies)

if(isLoading) {
  return 'Loading'
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      {loggedIn ? <Header menuOpener={menuOpener} /> : <NavTab />}
      <Switch>
        <Route path="/sign-up">
          <Register onRegisterSuccess={handleLoginSuccess} />
        </Route>
        
        <Route path="/sign-in">
          <Login onLoginSuccess={handleLoginSuccess} />
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
        loggedIn={loggedIn}
        onSaveMovie={handleSaveMovie} />

        <ProtectedRoute path="/profile" component={Profile}
        loggedIn={loggedIn}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onSignOut={handleSignOut} />
      </Switch>
      <Footer />
      <PopupHeader
        menuOpen={menuOpen}
        menuCloser={menuCloser} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
