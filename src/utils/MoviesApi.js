
class MoviesApi {
  constructor(options) {
    this._baseUrl = options.address;
    this._headers = options.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получение всех фильмой с api //getMovies
  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }
}

const moviesApi = new MoviesApi({
  address: 'https://api.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default moviesApi;