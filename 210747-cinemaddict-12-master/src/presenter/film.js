import FilmCard from "../templates/film-card.js";
import FilmPopUp from "../templates/pop-up.js";
import {UserAction, UpdateType} from '../utils/const.js';
import {renderElement, RenderPosition, remove, replace} from "../utils/render.js";
const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
export default class Film {
  // constructor(changeData) {
  constructor(container, changeData, changeMode) {
    this._changeData = changeData;
    this._container = container;
    this._changeMode = changeMode;

    console.log(this._changeData);
    this._handlePopUpOpenClick = this._handlePopUpOpenClick.bind(this);
    this._handlePopUpRemoveClick = this._handlePopUpRemoveClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._films = films.slice();
    this._filmPopUpComponent = null;
    this._filmComponent = null;
    this._mode = Mode.DEFAULT;
  }
  init(film) {
    this._film = film;
    console.log(this._film);
    console.log(this._container);
    // this._container = container;
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopUpComponent = this._filmPopUpComponent;
    this._filmPopUpComponent = new FilmPopUp(this._film);
    this._filmComponent = new FilmCard(this._film);
    // this._renderFilmCard(container, film);
    this._filmComponent.setPopUpClickHandler(this._handlePopUpOpenClick);
    // this._filmPopUpComponent.setPopUpRemoveClickHandler(this._handlePopUpRemoveClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    if (prevFilmComponent === null || prevFilmPopUpComponent === null) {
      // this._renderFilmCard(container);
      renderElement(this._container, this._filmComponent.getElement(), RenderPosition.AFTERBEGIN);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    console.log(prevFilmComponent);
    // if (this._container.contains(prevfilmComponent.getElement())) {
    //   replace(this._filmComponent, prevfilmComponent);
    // }
    //
    // if (this._container.contains(prevfilmPopUpComponent.getElement())) {
    //   replace(this._filmPopUpComponent, prevfilmPopUpComponent);
    // }
    if (this._container.contains(prevFilmComponent.getElement())) {
      renderElement(document.body, prevFilmPopUpComponent);
    }

    replace(this._filmComponent, prevFilmComponent);

    if (this._mode === Mode.DETAILS) {
      replace(this._filmPopUpComponent, prevFilmPopUpComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopUpComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopUpComponent);
  }
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hidePopUp();
    }
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

  _handlePopUpOpenClick() {
    this._showPopUp();
  }


  _handlePopUpRemoveClick(film) {
    // this._changeData(film);
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        film
    );
    this._hidePopUp();
  }

  _handleWatchlistClick() {
    // console.log(`ss`);
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        )
    );
  }
  _handleWatchedClick() {
    // console.log(this._film);
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
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
    // console.log(`aa`);
    // console.log(this._film.isFavorite);

    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._changeData(this._filmPopUpComponent.getUpdatedData());
      this._hidePopUp();
    }
  }

  _showPopUp() {
    renderElement(document.body, this._filmPopUpComponent.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._filmPopUpComponent.setPopUpRemoveClickHandler(this._handlePopUpRemoveClick);
    this._filmPopUpComponent.setInnerHandlers();
    // document.addEventListener(`keydown`, this._onEscKeyDown());
    this._changeMode();
    this._mode = Mode.DETAILS;
  }
  _hidePopUp() {
    // this._changeData(film);
    this._filmPopUpComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    // document.removeEventListener(`keydown`, this._onEscKeyDown());
    this._mode = Mode.DEFAULT;
  }
  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    this.updateElement();
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
