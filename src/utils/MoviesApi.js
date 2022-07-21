class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
    }

    _checkResponse(res){
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      }

    getInitialMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co',
})

export default moviesApi;