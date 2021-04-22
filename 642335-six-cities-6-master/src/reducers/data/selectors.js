import {createSelector} from 'reselect';
import NameSpace from '../name-space.js';

import {getCurrentCity} from '../user/selectors.js';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getCurrentOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city);
    }
);

export const getCitiesList = createSelector(
    getOffers,
    (offers) => {
      return new Set([...offers.map((offer) => offer.city.name)]);
    }
);
