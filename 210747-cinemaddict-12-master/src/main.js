import {renderElement, RenderPosition} from "./utils/render.js";

import SiteMenu from "./templates/menu.js";
import FilmsModel from './model/movie.js';
import Status from "./templates/status.js";
import MovieList from './presenter/movie-list.js';
import {generateFilmCard} from "./mocks/generate-film-card.js";
import {getFilters} from "./mocks/filters.js";

const FILMS_COUNT = 26;
const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
const filters = getFilters(films);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const movieList = new MovieList(filmsModel);
movieList.init();
renderElement(siteHeaderElement, new Status(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenu(filters).getElement(), RenderPosition.AFTERBEGIN);
