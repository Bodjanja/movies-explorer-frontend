class MainApi {
    constructor(data) {
        this._baseUrl = data.baseUrl
        this._token = data.token
    }

    _checkResponse(response){
        if (response.ok) {
          return response.json()
        }
        else{return Promise.reject(`Ошибка: ${response.status}`)}
      }

    register(userName, userEmail, userPassword) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPassword
            })
        })
        .then((response) => this._checkResponse(response))
    }

    login = (password, email) => {
        return fetch(`${this._baseUrl}/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password,
                    email
                })
            })
            .then((response) => this._checkResponse(response))
    }

    checkToken = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            .then((response) => this._checkResponse(response))
    }

    getUserData() {//Получить информацию о профиле с сервера для вставки в разметку
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then((response) => this._checkResponse(response))
      }

      updateUserData(userName, userEmail) {
          return fetch(`${this._baseUrl}/users/me`, {
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                name: userName,
                email: userEmail
            })
          })
          .then((response) => this._checkResponse(response))
      }

      createMovie(movie) {
          return fetch(`${this._baseUrl}/movies`, {
              method: 'POST',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                country: movie.country || 'unknown',
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id.toString(),
                nameRU: movie.nameRU,
                nameEN: movie.nameEN || 'unknown'
            })
          })
          .then((response) => this._checkResponse(response))
      }

      getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => this._checkResponse(response))
      }

      deleteSavedMovie(movieId) {
          return fetch(`${this._baseUrl}/movies/${movieId}`, {
              method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
          })
          .then((response) => this._checkResponse(response))
      }
}

const mainApi = new MainApi({
    baseUrl: "https://backend.bodjanja.nomoredomains.xyz"
})

export default mainApi;