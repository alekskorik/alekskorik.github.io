import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import leaflet from 'leaflet';
import reducer from '../../reducers/index.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

leaflet.map = () => ({
  setView: () => {},
  addLayer: () => {},
});

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: `120`,
    degree: `Apartment`,
    order: `Premium`,
    photo: `img/apartment-01.jpg`,
    id: 1
  },
];

const store = createStore(reducer);

it(`Correctly render component MainPage`, () => {
  const tree = renderer
  .create(
      <Provider store={store}>
        <Router history={history}>
          <MainPage
            offers = {mock}
          />
        </Router>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
