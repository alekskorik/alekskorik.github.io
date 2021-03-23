import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import leaflet from 'leaflet';
import reducer from '../../reducer.js';

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
        <MainPage
          offers = {mock}
        />
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
