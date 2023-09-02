import { checkResponse, BASE_URL } from './constants';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

// Регистрация пользователя
export const register = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers,
        body: JSON.stringify({ name, email, password }),
    }).then((res) => checkResponse(res))
}

// Авторизация пользователя
export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    }).then((res) => checkResponse(res))
}

// Получаем информацию о пользователе
export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            ...headers,
        },
    }).then((res) => checkResponse(res));
};

export const updateUserInfo = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
            ...headers,
        },
        body: JSON.stringify({ name: data.name, email: data.email }),
    }).then((res) => checkResponse(res))
};

// Сохраняем фильм пользователя
export const saveMovie = (movie, jwt) => {
    return fetch(`${BASE_URL}/movies`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
        },
        body: JSON.stringify({
            movieId: movie.id,
            nameRU: movie.nameRU || 'Нет данных',
            nameEN: movie.nameEN || 'Нет данных',
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        }),
    }).then((res) => checkResponse(res))
};

// Получаем все сохраненные фильмы пользователя
export const getSavedMovies = (jwt) => {
    return fetch(`${BASE_URL}/movies`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            ...headers,
        }
    }).then((res) => checkResponse(res))
};

// Удаляем фильм пользователя
export const deleteMovie = (id, jwt) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            ...headers,
        },
    }).then((res) => checkResponse(res))
};

