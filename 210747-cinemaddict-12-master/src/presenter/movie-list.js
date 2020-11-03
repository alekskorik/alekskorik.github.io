import Sorting from "../templates/sort.js";
import Film from './film.js';
// import FilmPopUp from "../templates/pop-up.js";
import ShowMoreBtn from "../templates/show-more-btn.js";
import {renderElement, RenderPosition} from "../utils/render.js";
const siteMainElement = document.querySelector(`.main`);
const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);
import {updateItem} from "../utils/common.js";
// const Movie = new Film();
const FILMS_COUNT = 26;
const STARTING_FILMS_COUNT = 5;
let renderedFilms = STARTING_FILMS_COUNT;
export default class MovieList {
  constructor() {
    this._filmPresenter = {};
    this._sortComponent = new Sorting();
    // this._popUpComponent = new FilmPopUp();
    this._showMoreBtnComponent = new ShowMoreBtn();
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }
  init(films) {
    this._films = films.slice();
    this._sourceFilms = films.slice();
    this._renderContainer();
  }
  _renderSort() {
    renderElement(siteMainElement, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderFilmCard(container, film) {
    const Movie = new Film(this._handleFilmChange);
    Movie.init(container, film);
    this._filmPresenter[film.id] = Movie;
    // console.log(this._filmPresenter);
  }


  _renderFilms() {
    const firstFilms = this._films.slice(0, STARTING_FILMS_COUNT);
    firstFilms.forEach((card) => {
      // console.log(card);
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

    renderElement(siteMainElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

    this._showMoreBtnComponent.setClickHandler(() => {
      renderNextFilms();
    });
  }
  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
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
