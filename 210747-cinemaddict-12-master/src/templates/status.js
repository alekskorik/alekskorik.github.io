import {getStatus} from "../utils/get-status.js";
import AbstractView from "./abstract.js";

export const createProfileStatusTemplate = (filters) => {
  const {watched} = filters;
  const status = getStatus(watched);
  return (`<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  </div>
  `);
};

export default class Status extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
    // this._element = null;
  }

  getTemplate() {
    return createProfileStatusTemplate(this._filters);
  }
}
