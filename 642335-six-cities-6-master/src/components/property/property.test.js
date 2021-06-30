
import React from 'react';
import renderer from 'react-test-renderer';
import Property from './property.jsx';

import {Router} from 'react-router-dom';
import history from '../../history';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';
import {createAPI} from '../../api';
import thunk from 'redux-thunk';

const mockCities = new Set([
  `Amsterdam`,
  `Budapesht`,
  `Wroclaw`
]);

const mockOffers = [
  {
    isPremium: true,
    previewImage: ``,
    price: 222,
    isFavorite: true,
    id: 1,
    title: ``,
    type: ``,
    city: {
      name: `Wroclaw`
    }
  },
  {
    isPremium: true,
    previewImage: ``,
    price: 222,
    isFavorite: true,
    id: 2,
    title: ``,
    type: ``,
    city: {
      name: `Wroclaw`
    }
  },
];

const api = createAPI();
const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));


it(`Test Property Component`, () => {
  const tree = renderer
.create(
    <Provider store={store}>
      <Router history={history}>
        <Property cities={mockCities} offers={mockOffers}/>
      </Router>
    </Provider>
)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
