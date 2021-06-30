import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {ActionType, ActionCreator, reducer} from './data';
import card from '../../mock/card';

const state = {
  offers: [card],
  activeOfferId: null,
  currentOfferId: null,
  reviews: [],
  favorite: []
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
  loadReviews: (hottel = 2) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hottel}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
  uploadComment: (rating, comment, hottelId) => (dispatch, _getState, api) => {
    return api.post(`/comments/${hottelId}`, {rating, comment})
      .then(({status, data}) => {
        if (status === 200) {
          dispatch(ActionCreator.loadReviews(data));
        }
      });
  },
  addFavoriteHotel: (hottelId, statusRequire) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${hottelId}/${statusRequire}`)
      .then(({status, data}) => {
        if (status === 200) {
          dispatch(ActionCreator.reloadOffers(data));
        }
      }).catch(() => {
        return;
      });
  },
  loadFavorite: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then(({data}) => {
        dispatch(ActionCreator.loadFavorite(data));
      });
  }
};

describe(`Reducer testing on AXIOS`, () => {

  it(`Test API Call`, () => {
    const dispatch = jest.fn();
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const loadOffers = Operation.loadOffers();
    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return loadOffers(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_OFFERS,
            offers: [{fake: true}]
          });
        });
  });

  it(`Test Call CURRENT_OFFER`, () => {
    const action = {
      type: ActionType.CURRENT_OFFER,
      id: 2
    };
    expect(reducer(state, action).currentOfferId).toEqual(2);
  });

  it(`Test Call ACTIVE_OFFER`, () => {
    const action = {
      type: ActionType.ACTIVE_OFFER,
      id: 3
    };
    expect(reducer(state, action).activeOfferId).toEqual(3);
  });

  it(`Test Call RELOAD_OFFER`, () => {
    const action = {
      type: ActionType.RELOAD_OFFER,
      offer: card
    };
    expect(reducer(state, action).offers).toEqual(state.offers);
  });

  it(`Test Call LOAD_FAVORITE`, () => {
    const dispatch = jest.fn();
    const api = createAPI();

    const apiMock = new MockAdapter(api);

    const loadFavorite = Operation.loadFavorite();
    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return loadFavorite(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_FAVORITE,
            offers: [{fake: true}]
          });
        });
  });

  it(`Test Call LOAD_REVIEWS`, () => {
    const dispatch = jest.fn();
    const api = createAPI();

    const apiMock = new MockAdapter(api);
    const loadReviews = Operation.loadReviews();
    apiMock
      .onGet(`/comments/2`)
      .reply(200, [{fake: true}]);

    return loadReviews(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_REVIEWS,
            reviews: [{fake: true}]
          });
        });
  });

});
