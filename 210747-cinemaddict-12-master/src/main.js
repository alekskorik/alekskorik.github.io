import {remove, renderElement, RenderPosition} from "./utils/render.js";

import FooterStats from './templates/footer-stats.js';
import FilterPresenter from './presenter/filter.js';
import MenuModel from './model/menu.js';
import FilmsModel from './model/movie.js';
import FilterModel from './model/filter';
import Statistics from './templates/statistics.js';
import UserRank from "./templates/status.js";
import MovieList from './presenter/movie-list.js';
import {MenuItem, UpdateType} from './utils/const.js';
import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';


const AUTHORIZATION = `Basic 8yg9123uin12ok3h=`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);


const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

let statisticsComponent = null;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElements = document.querySelector(`.footer__statistics`);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const menuModel = new MenuModel();

const userRank = new UserRank(filmsModel);
const footerStats = new FooterStats(filmsModel);
const movieList = new MovieList(filterModel, filmsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, menuModel, filmsModel);

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === menuModel.getMenuItem()) {
    return;
  }
  switch (menuItem) {
    case MenuItem.FILTER:
      menuModel.setMenuItem(menuItem, MenuItem.FILTER);
      remove(statisticsComponent);
      movieList.init();
      break;
    case MenuItem.STATISTICS:
      menuModel.setMenuItem(menuItem, MenuItem.STATISTICS);
      movieList.destroy();
      statisticsComponent = new Statistics(filmsModel.getFilms());
      renderElement(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent.init();
      break;
  }

  menuModel.setMenuItem(UpdateType.NONE, menuItem);
};

movieList.init();
filterPresenter.init();

renderElement(siteHeaderElement, userRank.getElement(), RenderPosition.BEFOREEND);
renderElement(footerStatisticsElements, footerStats, RenderPosition.BEFOREEND);

apiWithProvider.getFilms()
.then((films) => {
  filterPresenter.setInnerHandlers();
  filterPresenter.setMenuClickHandler(handleSiteMenuClick);
  filmsModel.setFilms(UpdateType.INIT, films);
})
 .catch(() => {
   filterPresenter.setInnerHandlers();
   filterPresenter.setMenuClickHandler(handleSiteMenuClick);
   filmsModel.setFilms(UpdateType.INIT, []);
 });
window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`);
    })
    .catch(() => {
      console.log(`ServiceWorker isn't available`);
    });
});
window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
