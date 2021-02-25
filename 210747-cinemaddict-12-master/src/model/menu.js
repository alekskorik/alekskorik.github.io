import Observer from '../utils/observer.js';
import {MenuItem} from '../utils/const.js';

export default class Menu extends Observer {
  constructor() {
    super();

    this._activeMenuItem = MenuItem.FILTER;
  }

  setMenuItem(updateType, item) {
    this._activeMenuItem = item;
    this._notify(updateType, item);
  }

  getMenuItem() {
    return this._activeMenuItem;
  }
}
