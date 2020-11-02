import {renderElement, RenderPosition} from "./utils/render.js";

import SiteMenu from "./templates/menu.js";
// import Sorting from "./templates/sort.js";
// import FilmCard from "./templates/film-card.js";
// import FilmPopUp from "./templates/pop-up.js";
// import ShowMoreBtn from "./templates/show-more-btn.js";
import Status from "./templates/status.js";
import MovieList from './presenter/movie-list.js';
import {generateFilmCard} from "./mocks/generate-film-card.js";
import {getFilters} from "./mocks/filters.js";


const FILMS_COUNT = 26;
// const STARTING_FILMS_COUNT = 5;
const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
// console.log(films);
// const firstFilms = new Array(STARTING_FILMS_COUNT).fill().map(generateFilmCard);
const filters = getFilters(films);
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
const movieList = new MovieList();
movieList.init(films);
renderElement(siteHeaderElement, new Status(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenu(filters).getElement(), RenderPosition.AFTERBEGIN);
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
