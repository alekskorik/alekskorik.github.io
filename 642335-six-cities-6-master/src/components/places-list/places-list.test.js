import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list.jsx';

const mock = [
  {title: `Beautiful & luxurious apartment at great location`},
];

it(`Correctly render component PlacesList`, () => {
  const tree = renderer
  .create(<PlacesList
    infoCard = {mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
