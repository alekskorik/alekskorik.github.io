import {adapter} from './adapter';

const initialState = {
  offers: []
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      offers
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(adapter(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_OFFERS`:
      return Object.assign({}, state, {
        offers: action.offers
      });
    default: return state;
  }
};

export {
  reducer,
  ActionCreator,
  Operation
};
