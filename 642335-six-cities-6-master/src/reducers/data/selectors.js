import {createSelector} from 'reselect';
import NameSpace from '../name-space.js';

import {getCurrentCity} from '../user/selectors.js';
const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getFavoriteOffers = (state) => {
  return state[NAME_SPACE].favoriteOffers;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getNearbyOffers = (state) => {
  return state[NAME_SPACE].nearbyOffers;
};

export const getCurrentId = (state) => {
  return state[NAME_SPACE].getCurrentOfferId;
};

const stateMock = (state) => state;

export const getCurrentOffer = (id) => createSelector(
    getOffers,
    stateMock,
    (offers) => {
      return offers.find((it) => it.id === Number(id));
    }
);

export const getActiveCard = (state) => {
  return state[NAME_SPACE].getActiveId;
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
      return new Set([...offers.map((offer) => offer.city.name).sort()]);
    }
);

export const getCurrentCityLocation = createSelector(
    getCurrentOffers,
    (offers) => {
      return offers[0] ? offers[0].city.location : [52.37454, 4.897976];
    }
);

export const getFavoriteCities = createSelector(
    getFavoriteOffers,
    (offers) => {
      return new Set([...offers.map((offer) => offer.city.name)]);
    }
);
