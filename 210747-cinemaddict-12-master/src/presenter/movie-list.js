import Sorting from "../templates/sort.js";
import Film from './film.js';
import ShowMoreBtn from "../templates/show-more-btn.js";
import Loading from '../templates/loading.js';
import NoData from '../templates/no-data.js';
import {filter} from '../utils/filter';
import {renderElement, RenderPosition, remove} from "../utils/render.js";
const siteMainElement = document.querySelector(`.main`);
const filmsListContainer = document.querySelector(`.films`);
const $filmsContainer = siteMainElement.querySelector(`.films-list__container`);
import {sortByDate, sortByRating, SortType} from '../utils/sort';
import {UserAction, UpdateType} from '../utils/const.js';
const STARTING_FILMS_COUNT = 5;
let renderedFilms = STARTING_FILMS_COUNT;
export default class MovieList {
  constructor(filterModel, filmsModel, api) {
    this._filmPresenter = {};
    this._api = api;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._sortComponent = null;
    this._showMoreBtnComponent = null;
    this._isLoading = true;
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._loadingComponent = new Loading();
    this._noDataComponent = new NoData();
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderContainer();
  }

  destroy() {
    this._clearFilmsList({resetRenderedFilmsCount: true, resetSortType: true});

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.slice().sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.slice().sort(sortByRating);
      default:
        return filteredFilms;
    }
  }
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateFilm(update)
       .then((response) => this._filmsModel.updateFilm(updateType, response));
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
        this._handleFilmsChange(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmsList();
        this._renderContainer();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderContainer();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearFilmsList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderContainer();
        break;
    }

  }

  _handleFilmsChange(data) {
    if (this._filmPresenter[data.id]) {
      this._filmPresenter[data.id].init(data);
    }
  }

  _handleModeChange() {
    [
      ...Object.values(this._filmPresenter),
    ].forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList({resetRenderedFilmsCount: true});
    this._renderContainer();
    renderedFilms = STARTING_FILMS_COUNT;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sorting(this._currentSortType);
    if (!this._isLoading) {
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
    renderElement(filmsListContainer, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderFilmCard(container, film) {
    const Movie = new Film(container, this._handleViewAction, this._handleModeChange, this._api);
    Movie.init(film);
    this._filmPresenter[film.id] = Movie;
  }

  _renderFilms(films) {
    films.forEach((card) => this._renderFilmCard($filmsContainer, card));
  }
  _renderNoData() {
    renderElement(siteMainElement, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    renderElement(siteMainElement, this._loadingComponent, RenderPosition.AFTERBEGIN);
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreBtnComponent = new ShowMoreBtn();
    this._showMoreBtnComponent.setClickHandler(this._handleShowMoreButtonClick);
    renderElement(siteMainElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _clearFilmsList({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;

    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};
    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._showMoreBtnComponent);

    if (resetRenderedFilmsCount) {
      renderedFilms = STARTING_FILMS_COUNT;
    } else {
      renderedFilms = Math.min(filmsCount, renderedFilms);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderContainer() {
    const films = this._getFilms();
    const filmsCount = this._getFilms().length;

    this._renderSort();

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (filmsCount === 0) {
      this._renderNoData();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmsCount, renderedFilms)));

    if (filmsCount > renderedFilms) {
      this._renderShowMoreBtn();
    }
  }
}
