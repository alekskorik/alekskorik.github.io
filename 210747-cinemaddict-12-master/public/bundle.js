/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _templates_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/menu.js */ "./src/templates/menu.js");
/* harmony import */ var _templates_status_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/status.js */ "./src/templates/status.js");
/* harmony import */ var _presenter_movie_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presenter/movie-list.js */ "./src/presenter/movie-list.js");
/* harmony import */ var _mocks_generate_film_card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mocks/generate-film-card.js */ "./src/mocks/generate-film-card.js");
/* harmony import */ var _mocks_filters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mocks/filters.js */ "./src/mocks/filters.js");



// import Sorting from "./templates/sort.js";
// import FilmCard from "./templates/film-card.js";
// import FilmPopUp from "./templates/pop-up.js";
// import ShowMoreBtn from "./templates/show-more-btn.js";






const FILMS_COUNT = 26;
// const STARTING_FILMS_COUNT = 5;
const films = new Array(FILMS_COUNT).fill().map(_mocks_generate_film_card_js__WEBPACK_IMPORTED_MODULE_4__["generateFilmCard"]);
// console.log(films);
// const firstFilms = new Array(STARTING_FILMS_COUNT).fill().map(generateFilmCard);
const filters = Object(_mocks_filters_js__WEBPACK_IMPORTED_MODULE_5__["getFilters"])(films);
// let renderedFilms = STARTING_FILMS_COUNT;

// const renderFilm = (container, film) => {
//   const filmComponent = new FilmCard(film);
//   const filmPopUpComponent = new FilmPopUp(film);
//
//   const onEscKeyDown = (tap) => {
//     if (tap.keyCode === 27) {
//       hidePopUp();
//     }
//   };
//
//
//   const showPopUp = () => {
//     renderElement(siteFooterElement, filmPopUpComponent.getElement(), RenderPosition.BEFOREEND);
//     document.addEventListener(`keydown`, onEscKeyDown);
//     // document.addEventListener(`keydown`, function popUpRemove(tap) {
//     //   if (tap.keyCode === 27) {
//     //     hidePopUp();
//     //     document.removeEventListener(`keydown`, popUpRemove, false);
//     //   }
//     // }
//     // );
//   };
//   const hidePopUp = () => {
//     console.log(filmPopUpComponent.getElement());
//     filmPopUpComponent.getElement().remove();
//     // document.removeEventListener(`keydown`, popUpRemove, false);
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   };
//   filmComponent.setPopUpClickHandler(() => {
//     showPopUp();
//   });
//   filmComponent.setPopUpClickHandler(() => {
//     showPopUp();
//   });
//   filmComponent.setPopUpClickHandler(() => {
//     showPopUp();
//   });
//   filmPopUpComponent.setPopUpRemoveClickHandler(() => {
//     hidePopUp();
//   });
//   renderElement(container, filmComponent.getElement(), RenderPosition.AFTERBEGIN);
// };
//
// // console.log(films);
// const renderNextFilms = () => {
//   let filmsToRender = films.slice(renderedFilms, renderedFilms + STARTING_FILMS_COUNT);
//   console.log({
//     renderedFilms,
//     filmsToRender
//   });
//   filmsToRender.forEach((filmCard) => {
//     renderFilm($filmsContainer, filmCard);
//     // renderElement($filmsContainer, new FilmCard().getElement(filmCard), RenderPosition.BEFOREEND);
//   });
//   renderedFilms = renderedFilms + STARTING_FILMS_COUNT;
//   // const filmCards = Array.from($filmsContainer.querySelectorAll(`article`));
//   // console.log(filmCards);
//   if (renderedFilms >= FILMS_COUNT) {
//     showMoreButton.getElement().remove();
//     showMoreButton.removeElement();
//   }
// };
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
// const siteFooterElement = document.querySelector(`.footer`);
// renderTemplate(siteMainElement, getMenuTemplate(filters), `afterbegin`);
const movieList = new _presenter_movie_list_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
movieList.init(films);
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(siteHeaderElement, new _templates_status_js__WEBPACK_IMPORTED_MODULE_2__["default"](filters).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND);
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["renderElement"])(siteMainElement, new _templates_menu_js__WEBPACK_IMPORTED_MODULE_1__["default"](filters).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN);
// renderElement(siteMainElement, new Sorting().getElement(), RenderPosition.AFTERBEGIN);

// const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);

// firstFilms.forEach((card) => {
//   console.log(card);
//   renderFilm($filmsContainer, card);
//   // siteMainElement.removeChild(siteMainElement.querySelector(`.film-details`));
//   console.log(document.querySelector(`.film-details`));
// });
// const showMoreButton = new ShowMoreBtn();
//
// renderElement(siteMainElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);
//
// showMoreButton.setClickHandler(() => {
//   renderNextFilms();
// });
// const movieList = new MovieList();
// movieList.init(films);


/***/ }),

/***/ "./src/mocks/comment.js":
/*!******************************!*\
  !*** ./src/mocks/comment.js ***!
  \******************************/
/*! exports provided: getComments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComments", function() { return getComments; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


const generateComment = () => {
  const authors = [
    `John`,
    `Peter`,
    `Sam`,
    `Vito`,
    `Donald`,
  ];

  const emoji = [
    {
      path: `./images/emoji/angry.png`,
      alt: `angry`
    },
    {
      path: `./images/emoji/puke.png`,
      alt: `puke`
    },
    {
      path: `./images/emoji/sleeping.png`,
      alt: `sleeping`
    },
    {
      path: `./images/emoji/smile.png`,
      alt: `smile`
    }
  ];

  const commentText = [
    `Good film, highly recommend`,
    `The best!`,
    `Not bad`,
    `I've seen better`
  ];

  return {
    commentText: commentText[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, commentText.length - 1)],
    emoji: emoji[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, emoji.length - 1)],
    author: authors[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, authors.length - 1)],
    date: `2019/12/31 23:59`
  };
};

const getComments = (numberOfComments) => {
  const commentsArr = [];
  for (let i = 0; i <= numberOfComments; i++) {
    commentsArr.push(generateComment());
  }
  return commentsArr;
};


/***/ }),

/***/ "./src/mocks/filters.js":
/*!******************************!*\
  !*** ./src/mocks/filters.js ***!
  \******************************/
/*! exports provided: getFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilters", function() { return getFilters; });
const getFilters = (films) => {
  const filters = {
    watchlist: films.filter((film) => film.isInWatchlist),
    watched: films.filter((film) => film.isWatched),
    favorite: films.filter((film) => film.isFavorite)
  };
  return filters;
};


/***/ }),

/***/ "./src/mocks/generate-film-card.js":
/*!*****************************************!*\
  !*** ./src/mocks/generate-film-card.js ***!
  \*****************************************/
/*! exports provided: generateFilmCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmCard", function() { return generateFilmCard; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.js */ "./src/mocks/comment.js");


const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
const generateTitle = () => {
  const titles = [
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
    `Sagerbush trail`,
    `The Dance of Life`,
  ];
  return titles[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, titles.length - 1)];
};

const generatePoster = () => {
  const postersNames = [
    `the-dance-of-life.jpg`,
    `sagebrush-trail.jpg`,
    `the-man-with-the-golden-arm.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `popeye-meets-sinbad.png`,
    `the-man-with-the-golden-arm.jpg`,
    `the-great-flamarion.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `made-for-each-other.png`
  ];

  return postersNames[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, postersNames.length - 1)];
};

const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const numberOfSentences = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 5);
  const description = new Set();

  for (let i = 0; i < numberOfSentences; i++) {
    description.add(sentences[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, sentences.length - 1)]);
  }

  return Array.from(description).join(` `);
};

const generateRating = (a = 0, b = 1) => {
  return Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomFloatInteger"])(a, b);
};

const generateFilmReleaseYear = () => {
  return Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1920, 2020);
};

const generateFilmDuration = () => {
  const hours = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 3);
  const minutes = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 59);
  return {
    hours,
    minutes
  };
};

const generateGenres = () => {
  const genres = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Horror`,
    `Documentary`
  ];
  const numberOfGenres = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 4);
  const genresSet = new Set();
  for (let i = 0; i < numberOfGenres; i++) {
    genresSet.add(genres[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, genres.length - 1)]);
  }
  return Array.from(genresSet);
};

const genereateCountry = () => {
  const countries = [
    `USA`,
    `Germany`,
    `UK`,
    `France`,
    `China`,
    `USSR`
  ];
  return countries[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, countries.length - 1)];
};

const generateDateOfRelease = () => {
  const releaseDate = new Date();
  releaseDate.setHours(23, 59, 59, 999);
  releaseDate.setFullYear(generateFilmReleaseYear(), Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 11), Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 31));
  return releaseDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

const generateCensorAge = () => {
  const limits = [
    `12+`,
    `16+`,
    `18+`,
  ];

  return limits[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, limits.length - 1)];
};

const generateActors = () => {
  const actors = [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    ` Dan Duryea`,
  ];
  const numberOfActors = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 3);
  const actorsSet = new Set();
  for (let i = 0; i < numberOfActors; i++) {
    actorsSet.add(actors[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, actors.length - 1)]);
  }
  return Array.from(actorsSet);
};

const generateWriters = () => {
  const writers = [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
  ];
  const numberOfWriters = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 3);
  const writersSet = new Set();
  for (let i = 0; i < numberOfWriters; i++) {
    writersSet.add(writers[Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, writers.length - 1)]);
  }
  return Array.from(writersSet);
};

const generateFilmCard = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    posterName: generatePoster(),
    description: generateDescription(),
    rating: generateRating(0, 10),
    filmReleaseYear: generateFilmReleaseYear(),
    filmDuration: generateFilmDuration(),
    genres: generateGenres(),
    director: `Anthony Mann`,
    writers: generateWriters(),
    actors: generateActors(),
    country: genereateCountry(),
    filmReleasefullDate: generateDateOfRelease(),
    censorAge: generateCensorAge(),
    isFavorite: Boolean(Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isWatched: Boolean(Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isInWatchList: Boolean(Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    comments: Object(_comment_js__WEBPACK_IMPORTED_MODULE_1__["getComments"])(Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 5))
  };
};


/***/ }),

/***/ "./src/presenter/film.js":
/*!*******************************!*\
  !*** ./src/presenter/film.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Film; });
/* harmony import */ var _templates_film_card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/film-card.js */ "./src/templates/film-card.js");
/* harmony import */ var _templates_pop_up_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates/pop-up.js */ "./src/templates/pop-up.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");



const siteMainElement = document.querySelector(`.main`);
class Film {
  constructor(changeData) {
    this._changeData = changeData;
    console.log(this._changeData);
    this._handleWatchlistClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._films = films.slice();
    this._filmPopUpComponent = null;
    this._filmComponent = null;
  }
  init(container, film) {
    this._film = film;
    this._container = container;
    const prevfilmComponent = this._filmComponent;
    const prevfilmPopUpComponent = this._filmPopUpComponent;
    this._filmPopUpComponent = new _templates_pop_up_js__WEBPACK_IMPORTED_MODULE_1__["default"](this._film);
    this._filmComponent = new _templates_film_card_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._film);
    // this._renderFilmCard(container, film);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setPopUpClickHandler(() => {
      this._showPopUp();
    });
    this._filmPopUpComponent.setPopUpRemoveClickHandler(() => {
      this._hidePopUp();
    });
    if (prevfilmComponent === null || prevfilmPopUpComponent === null) {
      // this._renderFilmCard(container);
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["renderElement"])(this._container, this._filmComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].AFTERBEGIN);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    console.log(prevfilmComponent);
    if (this._container.getElement().contains(prevfilmComponent.getElement())) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._filmComponent, prevfilmComponent);
    }

    if (this._container.getElement().contains(prevfilmPopUpComponent.getElement())) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._filmPopUpComponent, prevfilmPopUpComponent);
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(prevfilmComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(prevfilmPopUpComponent);
  }

  destroy() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(this._filmComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(this._filmPopUpComponent);
  }


  // _renderFilmCard(container) {
  //   // const filmComponent = new FilmCard(film);
  //   // const filmPopUpComponent = new FilmPopUp(film);
  //   // this._filmComponent = new FilmCard(film);
  //   // this._filmPopUpComponent = new FilmPopUp(film);
  //
  // _onEscKeyDown(tap) {
  //   if (tap.keyCode === 27) {
  //     this._hidePopUp();
  //   }
  // }
  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchList
            }
        )
    );
  }
  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }
  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }


  _showPopUp() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["renderElement"])(siteMainElement, this._filmPopUpComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].BEFOREEND);
    // document.addEventListener(`keydown`, this._onEscKeyDown());
  }
  _hidePopUp() {
    this._filmPopUpComponent.getElement().remove();
    // document.removeEventListener(`keydown`, this._onEscKeyDown());
  }
  // this._filmComponent.setPopUpClickHandler(() => {
  //   showPopUp();
  // });
  // this._filmPopUpComponent.setPopUpRemoveClickHandler(() => {
  //   hidePopUp();
  // });
  // renderElement(container, this._filmComponent.getElement(), RenderPosition.AFTERBEGIN);
//   }
}


/***/ }),

/***/ "./src/presenter/movie-list.js":
/*!*************************************!*\
  !*** ./src/presenter/movie-list.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovieList; });
/* harmony import */ var _templates_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/sort.js */ "./src/templates/sort.js");
/* harmony import */ var _film_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./film.js */ "./src/presenter/film.js");
/* harmony import */ var _templates_show_more_btn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/show-more-btn.js */ "./src/templates/show-more-btn.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


// import FilmPopUp from "../templates/pop-up.js";


const siteMainElement = document.querySelector(`.main`);
const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);

// const Movie = new Film();
const FILMS_COUNT = 26;
const STARTING_FILMS_COUNT = 5;
let renderedFilms = STARTING_FILMS_COUNT;
class MovieList {
  constructor() {
    this._filmPresenter = {};
    this._sortComponent = new _templates_sort_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    // this._popUpComponent = new FilmPopUp();
    this._showMoreBtnComponent = new _templates_show_more_btn_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }
  init(films) {
    this._films = films.slice();
    this._sourceFilms = films.slice();
    this._renderContainer();
  }
  _renderSort() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_3__["renderElement"])(siteMainElement, this._sortComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].AFTERBEGIN);
  }

  _renderFilmCard(container, film) {
    const Movie = new _film_js__WEBPACK_IMPORTED_MODULE_1__["default"](this._handleFilmChange);
    Movie.init(container, film);
    this._filmPresenter[film.id] = Movie;
    // console.log(this._filmPresenter);
  }


  _renderFilms() {
    const firstFilms = this._films.slice(0, STARTING_FILMS_COUNT);
    firstFilms.forEach((card) => {
      console.log(card);
      this._renderFilmCard($filmsContainer, card);
    });
  }
  _renderPopUp() {

  }
  _renderShowMoreBtn() {
    const renderNextFilms = () => {
      let filmsToRender = this._films.slice(renderedFilms, renderedFilms + STARTING_FILMS_COUNT);
      console.log({
        renderedFilms,
        filmsToRender
      });
      filmsToRender.forEach((filmCard) => {
        this._renderFilmCard($filmsContainer, filmCard);
      });
      renderedFilms = renderedFilms + STARTING_FILMS_COUNT;
      if (renderedFilms >= FILMS_COUNT) {
        this._showMoreBtnComponent.getElement().remove();
        this._showMoreBtnComponent.removeElement();
      }
    };

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_3__["renderElement"])(siteMainElement, this._showMoreBtnComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].BEFOREEND);

    this._showMoreBtnComponent.setClickHandler(() => {
      renderNextFilms();
    });
  }
  _handleFilmChange(updatedFilm) {
    this._films = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_4__["updateItem"])(this._films, updatedFilm);
    this._sourceFilms = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_4__["updateItem"])(this._sourceFilms, updatedFilm);
    this._taskPresenter[updatedFilm.id].init(updatedFilm);
  }
  _clearFilmList() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
  }
  _renderContainer() {
    this._renderSort();
    //
    // this._renderFilmCard(0, STARTING_FILMS_COUNT);
    this._renderFilms();
    //
    this._renderShowMoreBtn();
  }
}

// import Sorting from "../templates/sort.js";
// import Film from './film.js';
// // import FilmPopUp from "../templates/pop-up.js";
// import ShowMoreBtn from "../templates/show-more-btn.js";
// import {renderElement, RenderPosition} from "../utils/render.js";
// const siteMainElement = document.querySelector(`.main`);
// const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);
// // const Movie = new Film();
// const FILMS_COUNT = 26;
// const STARTING_FILMS_COUNT = 5;
// let renderedFilms = STARTING_FILMS_COUNT;
// export default class MovieList {
//   constructor() {
//     this._filmPresenter = {};
//     this._sortComponent = new Sorting();
//     // this._popUpComponent = new FilmPopUp();
//     this._showMoreBtnComponent = new ShowMoreBtn();
//   }
//   init(films) {
//     this._films = films.slice();
//     this._renderContainer();
//   }
//   _renderSort() {
//     renderElement(siteMainElement, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
//   }
//
//   _renderFilmCard(container, film) {
//     const Movie = new Film();
//     Movie.init(container, film);
//     this._filmPresenter[film.id] = Movie;
//     console.log(this._filmPresenter);
//   }
//
//
//   _renderFilms() {
//     const firstFilms = this._films.slice(0, STARTING_FILMS_COUNT);
//     firstFilms.forEach((card) => {
//       console.log(card);
//       this._renderFilmCard($filmsContainer, card);
//     });
//   }
//   _renderPopUp() {
//
//   }
//   _renderShowMoreBtn() {
//     const renderNextFilms = () => {
//       let filmsToRender = this._films.slice(renderedFilms, renderedFilms + STARTING_FILMS_COUNT);
//       console.log({
//         renderedFilms,
//         filmsToRender
//       });
//       filmsToRender.forEach((filmCard) => {
//         this._renderFilmCard($filmsContainer, filmCard);
//       });
//       renderedFilms = renderedFilms + STARTING_FILMS_COUNT;
//       if (renderedFilms >= FILMS_COUNT) {
//         this._showMoreBtnComponent.getElement().remove();
//         this._showMoreBtnComponent.removeElement();
//       }
//     };
//
//     renderElement(siteMainElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
//
//     this._showMoreBtnComponent.setClickHandler(() => {
//       renderNextFilms();
//     });
//   }
//   // }
//   _renderContainer() {
//     this._renderSort();
//
//     // this._renderFilmCard(0, STARTING_FILMS_COUNT);
//     this._renderFilms();
//
//     this._renderShowMoreBtn();
//   }
// }


/***/ }),

/***/ "./src/templates/abstract.js":
/*!***********************************!*\
  !*** ./src/templates/abstract.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Abstract; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
// import {createElement} from "../utils/utils.js";


class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;

  }
}


/***/ }),

/***/ "./src/templates/comment.js":
/*!**********************************!*\
  !*** ./src/templates/comment.js ***!
  \**********************************/
/*! exports provided: getCommentTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCommentTemplate", function() { return getCommentTemplate; });
const getCommentTemplate = (comment) => {
  const {commentText, emoji, author, date} = comment;
  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji.path}" width="55" height="55" alt="${emoji.alt}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `);
};


/***/ }),

/***/ "./src/templates/film-card.js":
/*!************************************!*\
  !*** ./src/templates/film-card.js ***!
  \************************************/
/*! exports provided: createFilmCardTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCard; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");


const createFilmCardTemplate = (film) => {
  const MAX_DESCRIPTION_LENGTH = 139;
  const {title, rating, filmReleaseYear, filmDuration, genres, posterName, description, comments} = film;
  const stringifyedGenres = genres.join();
  return (`<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmReleaseYear}</span>
        <span class="film-card__duration">${filmDuration.hours + `h` + filmDuration.minutes + `m`}</span>
        <span class="film-card__genre">${stringifyedGenres}</span>
      </p>
      <img src="./images/posters/${posterName}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > MAX_DESCRIPTION_LENGTH ? description.slice(0, MAX_DESCRIPTION_LENGTH) + `...` : description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>
  `)
  ;
};

class FilmCard extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);


    this._watchlistClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  // this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  // this._handleWatchedClick = this._handleWatchedClick.bind(this);
  // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setPopUpClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    // console.log(this.callback);
    this._callback.watchedClick();
  }
  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }
  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }
  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}


/***/ }),

/***/ "./src/templates/menu.js":
/*!*******************************!*\
  !*** ./src/templates/menu.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteMenu; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");
// import {createElement} from "../utils/utils.js";


const createMenuTemplate = (filters) => {
  const {watchlist, watched, favorite} = filters;
  return (`<div><nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    </div>
  `);
};
class SiteMenu extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}


/***/ }),

/***/ "./src/templates/pop-up.js":
/*!*********************************!*\
  !*** ./src/templates/pop-up.js ***!
  \*********************************/
/*! exports provided: createPopUpTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopUpTemplate", function() { return createPopUpTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmPopUp; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");
/* harmony import */ var _comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.js */ "./src/templates/comment.js");



const createPopUpTemplate = (film) => {
  const {title, posterName, rating, director, writers, actors, filmReleasefullDate, filmDuration, country, genres, censorAge, description, comments} = film;

  const stringifyedWriters = writers.join();
  const stringifyedActors = actors.join();

  const commentsList = comments.map((comment) => {
    return Object(_comment_js__WEBPACK_IMPORTED_MODULE_1__["getCommentTemplate"])(comment);
  }).join(`\n`);

  return (`<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${posterName}" alt="">
              <p class="film-details__age">${censorAge}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${stringifyedWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${stringifyedActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmReleasefullDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmDuration.hours + `h` + filmDuration.minutes + `m`}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
    ${genres.map((genreName) => {
      return `<span class="film-details__genre">` + genreName + `</span>`;
    }).join(``)}
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__middle-container">
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

            <ul class="film-details__comments-list">
            ${commentsList}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>

      </form>
    </section>
  `);
};

class FilmPopUp extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createPopUpTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setPopUpRemoveClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }
}


/***/ }),

/***/ "./src/templates/show-more-btn.js":
/*!****************************************!*\
  !*** ./src/templates/show-more-btn.js ***!
  \****************************************/
/*! exports provided: createShowMoreBtnTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreBtnTemplate", function() { return createShowMoreBtnTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowMoreBtn; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");


const createShowMoreBtnTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

class ShowMoreBtn extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}


/***/ }),

/***/ "./src/templates/sort.js":
/*!*******************************!*\
  !*** ./src/templates/sort.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sorting; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");


const createFiltersTemplate = () => {
  return (`<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
    </div>
  `);
};
class Sorting extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    // this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}


/***/ }),

/***/ "./src/templates/status.js":
/*!*********************************!*\
  !*** ./src/templates/status.js ***!
  \*********************************/
/*! exports provided: createProfileStatusTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProfileStatusTemplate", function() { return createProfileStatusTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Status; });
/* harmony import */ var _utils_get_status_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/get-status.js */ "./src/utils/get-status.js");
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract.js */ "./src/templates/abstract.js");



const createProfileStatusTemplate = (filters) => {
  const {watched} = filters;
  const status = Object(_utils_get_status_js__WEBPACK_IMPORTED_MODULE_0__["getStatus"])(watched);
  return (`<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  </div>
  `);
};

class Status extends _abstract_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createProfileStatusTemplate(this._filters);
  }
}


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: getRandomInteger, getRandomFloatInteger, updateItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFloatInteger", function() { return getRandomFloatInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItem", function() { return updateItem; });
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (lower + Math.random() * (upper - lower)).toFixed(1);
};
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};


/***/ }),

/***/ "./src/utils/get-status.js":
/*!*********************************!*\
  !*** ./src/utils/get-status.js ***!
  \*********************************/
/*! exports provided: getStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatus", function() { return getStatus; });
const getStatus = (amountOfWatched) => {
  let status;
  if (amountOfWatched.length === 0) {
    status = ``;
  } else if (amountOfWatched.length <= 10) {
    status = `novice`;
  } else if (amountOfWatched.length >= 10 && amountOfWatched.length <= 20) {
    status = `fan`;
  } else {
    status = `movie buff`;
  }
  return status;
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: RenderPosition, renderElement, renderTemplate, createElement, replace, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElement", function() { return renderElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTemplate", function() { return renderTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/abstract.js */ "./src/templates/abstract.js");


const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderElement = (container, child, place) => {
  if (container instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  if (child instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  if (container instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
const replace = (newChild, oldChild) => {
  if (oldChild instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof _templates_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map