import AbstractView from "./abstract.js";

const createFiltersTemplate = () => {
  return (`<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
    </div>
  `);
};
export default class Sorting extends AbstractView {
  constructor() {
    super();
    // this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
