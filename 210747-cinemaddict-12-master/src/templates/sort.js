import AbstractView from "./abstract.js";
import {SortType} from '../utils/sort';

const createFiltersTemplate = () => {
  return (`<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>
    </div>
  `);
};
export default class Sorting extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  _changeSortButtonActiveState(evt) {
    this.getElement().querySelectorAll(`.sort__button`)
    .forEach((button) => button.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._changeSortButtonActiveState(evt);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
