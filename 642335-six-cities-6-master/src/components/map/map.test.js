import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

import leaflet from 'leaflet';
import reducer from '../../reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';


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
    id: 1,
    coordinates: [52.3909553943508, 4.85309666406198],
  },
];

it(`Snapshot test Map Component`, () => {
  const tree = renderer
  .create(
      <Provider store={createStore(reducer)}>
        <Map
          offers={mock}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
