import Sorting from "../templates/sort.js";
import Film from './film.js';
import ShowMoreBtn from "../templates/show-more-btn.js";
import {renderElement, RenderPosition} from "../utils/render.js";
const siteMainElement = document.querySelector(`.main`);
const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);
import {sortByDate, sortByRating, SortType} from '../utils/sort';
import {UserAction, UpdateType} from '../utils/const.js';
const STARTING_FILMS_COUNT = 5;
let renderedFilms = STARTING_FILMS_COUNT;
export default class MovieList {
  constructor(filmsModel) {
    this._filmPresenter = {};
    this._filmsModel = filmsModel;
    this._sortComponent = new Sorting();
    this._showMoreBtnComponent = new ShowMoreBtn();
    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderContainer();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
      default:
        return this._filmsModel.getFilms();
    }
  }
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }

  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:

        break;
    }

  }

  _handleModeChange() {
    [
      ...Object.values(this._filmPresenter),
    ].forEach((presenter) => presenter.resetView());
  }

  // _handleFilmChange(updatedFilm) {
  //   if (this._filmPresenter[updatedFilm.id]) {
  //     this._filmPresenter[updatedFilm.id].init(updatedFilm);
  //   }
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    renderElement(siteMainElement, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(container, film) {
    // const Movie = new Film(container, this._handleFilmChange, this._handleModeChange);
    const Movie = new Film(container, this._handleViewAction, this._handleModeChange);
    Movie.init(film);
    this._filmPresenter[film.id] = Movie;
  }

  _renderFilms(films) {
    films.forEach((card) => this._renderFilmCard($filmsContainer, card));
  }

  _renderFilmsList() {
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, STARTING_FILMS_COUNT));

    this._renderFilms(films);

    if (filmsCount > STARTING_FILMS_COUNT) {
      this._renderShowMoreBtn();
    }
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, renderedFilms + STARTING_FILMS_COUNT);
    const films = this._getFilms().slice(renderedFilms, renderedFilms + STARTING_FILMS_COUNT);

    this._renderFilms(films);
    renderedFilms = newRenderedFilmsCount;

    if (renderedFilms >= filmsCount) {
      this._showMoreBtnComponent.getElement().remove();
      this._showMoreBtnComponent.removeElement();
    }
  }

  _renderShowMoreBtn() {
    renderElement(siteMainElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
    this._showMoreBtnComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmsList() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
  }

  _renderContainer() {
    this._renderSort();
    this._renderFilmsList();
  }
}
