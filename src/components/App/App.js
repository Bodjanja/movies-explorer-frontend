import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';

import likedMovie from "../../images/likedMovie1.jpg";
import likedMovie2 from "../../images/likedMovie2.jpg";
import likedMovie3 from "../../images/likedMovie3.jpg";
import movie1 from "../../images/movie1.jpg";
import movie2 from "../../images/movie2.jpg";
import movie3 from "../../images/movie3.jpg";
import movie4 from "../../images/movie4.jpg";



function App() {

  const allMovies = [
    {
      name: "33 слова о дизайне",
      length: "1ч 42м",
      image: likedMovie,
      liked: true
    },
    {
      name: "Киноальманах «100 лет дизайна»",
      length: "1ч 42м",
      image: likedMovie2,
      liked: true,
    },
    {
      name: "В погоне за Бенкси",
      length: "1ч 42м",
      image: likedMovie3,
      liked: false,
    },
    {
      name: "Баския: Взрыв реальности",
      length: "1ч 42м",
      image: movie1,
      liked: false,
    },
    {
      name: "Бег это свобода",
      length: "1ч 42м",
      image: movie2,
      liked: true,
    },
    {
      name: "Книготорговцы",
      length: "1ч 42м",
      image: movie3,
      liked: false,
    },
    {
      name: "Когда я думаю о Германии ночью",
      length: "1ч 42м",
      image: movie4,
      liked: false,
    }
  ]

  const likedMovies = [
    {
      name: "33 слова о дизайне",
      length: "1ч 42м",
      image: likedMovie
    },
    {
      name: "Киноальманах «100 лет дизайна»",
      length: "1ч 42м",
      image: likedMovie2
    },
    {
      name: "В погоне за Бенкси",
      length: "1ч 42м",
      image: likedMovie3
    }
  ]

  const [menuOpen, setMenuOpen] = React.useState(false);

  function menuOpener() {
    setMenuOpen(true)
}

function menuCloser() {
    setMenuOpen(false)
}

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} allMovies={allMovies} />} />
        <Route path="/saved-movies" element={<SavedMovies menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} likedMovies={likedMovies} />} />
        <Route path="/profile" element={<Profile menuOpener={menuOpener} menuOpen={menuOpen} menuCloser={menuCloser} />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
