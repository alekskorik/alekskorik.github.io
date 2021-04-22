import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    degree: `Apartment`,
    order: `Premium`,
    photo: `img/apartment-01.jpg`,
    id: 1
  },
];

it(`Correctly render component PlacesList`, () => {
  const tree = renderer
  .create(<PlacesList
    offers = {mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
