import FilterView from '../templates/menu.js';
import {renderElement, replace, remove, RenderPosition} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../utils/const.js';

export default class Filter {
  constructor(filterContainer, filterModel, menuModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._menuModel = menuModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;
    this._menuClickHandler = null;
    this._filterComponent = null;

    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._menuModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._currentMenuItem = this._menuModel.getMenuItem();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter, this._currentMenuItem);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  setInnerHandlers() {
    this._filterComponent.setFilterTypeClickHandler(this._handleFilterTypeClick);
  }


  setMenuClickHandler(callback) {
    this._menuClickHandler = callback;
    this._filterComponent.setMenuClickHandler(callback);
  }

  _restoreHandlers() {
    this._filterComponent.setMenuClickHandler(this._menuClickHandler);
  }

  _handleFilterTypeClick(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent() {
    this.init();
    this.setInnerHandlers();
    this._restoreHandlers();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
