import {adapter} from './adapter';
import {RequestStatus} from '../../const.js';

const initialState = {
  offers: [],
  favoriteOffers: [],
  favoriteRequestStatus: RequestStatus.NOT_SENT,
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      offers
    };
  },
  loadFavorite: (offers) => {
    return {
      type: ActionType.LOAD_FAVORITE,
      offers
    };
  },
  setFavoriteStatus: (status) => {
    return {
      type: ActionType.SET_FAVORITE_STATUS,
      status
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(adapter(response.data)));
      });
  },
  loadFavorite: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(adapter(response.data)));
      });
  },
  changeIsOfferFavorite: (offerId, isFavorite) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setFavoriteStatus(RequestStatus.SENDING));
    return api.post(`/favorite/${offerId}/${isFavorite ? 1 : 0}`)
    .then(() => {
      dispatch(ActionCreator.setFavoriteStatus(RequestStatus.SUCCESS));
      dispatch(Operation.loadOffers());
      dispatch(Operation.loadFavorite());
    });
    // .catch(() => {
    //   dispatch(ActionCreator.setFavoriteRequestStatus(RequestStatus.ERROR));
    // });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.offers
      });
    case ActionType.LOAD_FAVORITE:
      return Object.assign({}, state, {
        favoriteOffers: action.offers
      });
    case ActionType.SET_FAVORITE_STATUS:
      return Object.assign({}, state, {
        favoriteRequestStatus: action.status
      });
    default: return state;
  }
};

export {
  reducer,
  ActionCreator,
  Operation
};
