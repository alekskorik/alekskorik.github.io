import AbstractView from "./abstract.js";

export const createFilmCardTemplate = (film) => {
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

export default class FilmCard extends AbstractView {
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
    console.log(this.callback);
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
