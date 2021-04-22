import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      offers
    };
  }
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
    .then((response) => {
      dispatch(ActionCreator.loadOffers(response.data));
    });
  }
};

describe(`Reducer testing on AXIOS`, () => {
  it(`Test API call`, () => {
    const dispatch = jest.fn;
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
    .onGet(`/hotels`)
    .reply(`200`, [{fake: true}]);

    return offersLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalled(1);
      expect(dispatch).toHaveBeenCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        offers: [{fake: true}]
      });
    });

  });
});
