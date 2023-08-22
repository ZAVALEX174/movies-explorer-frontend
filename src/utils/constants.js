export const BASE_URL = 'https://api.zuevdiplom.nomoredomains.xyz';
// export const BASE_URL = 'http://localhost:3000';
export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

// Переменные ширины экрана
const MAX_WIDTH_1161 = 1161;
const MIDDLE_WIDTH_768 = 1160;
const MIN_WIDTH_480 = 480;
// количество отображаемых фильмов, в зависимости от ширины
const INITIAL_CARDS_12 = 12;
const INITIAL_CARDS_8 = 8;
const INITIAL_CARDS_6 = 6;
const IINITIAL_CARDS_5 = 5;
// колличество добавляемых фильмов, в зависимости от ширины
const MORE_CARDS_3 = 3;
const MORE_CARDS_2 = 2;
const MORE_CARDS_1 = 2;

export {
    MAX_WIDTH_1161,
    MIDDLE_WIDTH_768,
    MIN_WIDTH_480,
    INITIAL_CARDS_12,
    INITIAL_CARDS_8,
    INITIAL_CARDS_6,
    IINITIAL_CARDS_5,
    MORE_CARDS_3,
    MORE_CARDS_2,
    MORE_CARDS_1
};