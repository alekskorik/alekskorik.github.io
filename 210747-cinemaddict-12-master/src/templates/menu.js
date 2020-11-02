// import {createElement} from "../utils/utils.js";
import AbstractView from "./abstract.js";

const createMenuTemplate = (filters) => {
  const {watchlist, watched, favorite} = filters;
  return (`<div><nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite.length}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    </div>
  `);
};
export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
