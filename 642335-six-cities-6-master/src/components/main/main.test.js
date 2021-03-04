import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main.jsx';

const mock = [
  {title: `Beautiful & luxurious apartment at great location`},
];
it(`Correctly render component MainPage`, () => {
  const tree = renderer
  .create(<MainPage
    PlacesName = {mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
