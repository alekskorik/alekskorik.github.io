import FilmCard from "../templates/film-card.js";
import FilmPopUp from "../templates/pop-up.js";
import {renderElement, RenderPosition, remove, replace} from "../utils/render.js";
const siteMainElement = document.querySelector(`.main`);
export default class Film {
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
    console.log(this._film);
    this._container = container;
    const prevfilmComponent = this._filmComponent;
    const prevfilmPopUpComponent = this._filmPopUpComponent;
    this._filmPopUpComponent = new FilmPopUp(this._film);
    this._filmComponent = new FilmCard(this._film);
    // this._renderFilmCard(container, film);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setPopUpClickHandler(() => {
      // this._handleWatchListClick();
      this._showPopUp();
    });
    this._filmPopUpComponent.setPopUpRemoveClickHandler(() => {
      this._hidePopUp();
    });
    if (prevfilmComponent === null || prevfilmPopUpComponent === null) {
      // this._renderFilmCard(container);
      renderElement(this._container, this._filmComponent.getElement(), RenderPosition.AFTERBEGIN);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    console.log(prevfilmComponent);
    if (this._container.getElement().contains(prevfilmComponent.getElement())) {
      replace(this._filmComponent, prevfilmComponent);
    }

    if (this._container.getElement().contains(prevfilmPopUpComponent.getElement())) {
      replace(this._filmPopUpComponent, prevfilmPopUpComponent);
    }

    remove(prevfilmComponent);
    remove(prevfilmPopUpComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopUpComponent);
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
    // console.log(`ss`);
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
    // console.log(this._film);
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
    // console.log(`aa`);
    // console.log(this._film.isFavorite);

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
    renderElement(siteMainElement, this._filmPopUpComponent.getElement(), RenderPosition.BEFOREEND);
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
