import FilmCard from "../templates/film-card.js";
import FilmPopUp from "../templates/pop-up.js";
import {UserAction, UpdateType} from '../utils/const.js';
import {renderElement, RenderPosition, remove, replace} from "../utils/render.js";
const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
export default class Film {
  constructor(container, changeData, changeMode, api) {
    this._changeData = changeData;
    this._container = container;
    this._changeMode = changeMode;
    this._api = api;

    this._handlePopUpOpenClick = this._handlePopUpOpenClick.bind(this);
    this._handlePopUpRemoveClick = this._handlePopUpRemoveClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddCommentKeyDown = this._handleAddCommentKeyDown.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._filmPopUpComponent = null;
    this._filmComponent = null;
    this._mode = Mode.DEFAULT;
  }
  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopUpComponent = this._filmPopUpComponent;
    this._filmPopUpComponent = new FilmPopUp(this._film, this._api);
    this._filmComponent = new FilmCard(this._film);
    this._filmComponent.setPopUpClickHandler(this._handlePopUpOpenClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._filmPopUpComponent.setAddCommentKeyDownHandler(this._handleAddCommentKeyDown);
    this._filmPopUpComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._filmPopUpComponent.setPopUpRemoveClickHandler(this._handlePopUpRemoveClick);
    this._filmPopUpComponent.setInnerHandlers();
    if (prevFilmComponent === null || prevFilmPopUpComponent === null) {
      renderElement(this._container, this._filmComponent.getElement(), RenderPosition.AFTERBEGIN);
      return;
    }

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

  _handlePopUpOpenClick() {
    this._showPopUp();
  }


  _handlePopUpRemoveClick(film) {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
        film
    );
    this._hidePopUp();
  }

  _handleAddCommentKeyDown(film) {
    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        film
    );
  }

  _handleDeleteClick(film) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        film
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
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
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
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
        UserAction.UPDATE_MOVIE,
        UpdateType.MINOR,
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
      this._changeData(
          UserAction.UPDATE_MOVIE,
          UpdateType.MINOR,
          this._filmPopUpComponent.getUpdatedData()
      );
      this._hidePopUp();
    }
  }

  _showPopUp() {
    renderElement(document.body, this._filmPopUpComponent.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }
  _hidePopUp() {
    this._filmPopUpComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
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
}
