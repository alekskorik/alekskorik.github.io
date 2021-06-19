import {adapter} from './adapter';
import {RequestStatus} from '../../const.js';

const initialState = {
  offers: [],
  favoriteOffers: [],
  reviews: [],
  nearbyOffers: [],
  favoriteRequestStatus: RequestStatus.NOT_SENT,
  activeOfferId: null,
  currentOfferId: null,
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`,
  CURRENT_OFFER: `CURRENT_OFFER`,
  ACTIVE_OFFER: `ACTIVE_OFFER`,
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
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      reviews
    };
  },
  loadNearbyOffers: (offers) => {
    return {
      type: ActionType.LOAD_NEARBY_OFFERS,
      offers
    };
  },
  setFavoriteStatus: (status) => {
    return {
      type: ActionType.SET_FAVORITE_STATUS,
      status
    };
  },
  currentOfferId: (id) => {
    return {
      type: ActionType.CURRENT_OFFER,
      id
    };
  },
  activeOfferId: (id) => {
    return {
      type: ActionType.ACTIVE_OFFER,
      id
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
  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    });
  },
  loadNearbyOffers: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
    .then((response) => {
      dispatch(ActionCreator.loadNearbyOffers(adapter(response.data)));
    });
  },
  changeIsOfferFavorite: (offerId, isFavorite) => (dispatch, _getState, api) => {
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
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.reviews
      });
    case ActionType.LOAD_NEARBY_OFFERS:
      return Object.assign({}, state, {
        nearbyOffers: action.offers
      });
    case ActionType.SET_FAVORITE_STATUS:
      return Object.assign({}, state, {
        favoriteRequestStatus: action.status
      });
    case ActionType.CURRENT_OFFER:
      return Object.assign({}, state, {
        currentOfferId: action.id
      });
    case ActionType.ACTIVE_OFFER:
      return Object.assign({}, state, {
        activeOfferId: action.id
      });
    default: return state;
  }
};

export {
  reducer,
  ActionCreator,
  Operation
};
