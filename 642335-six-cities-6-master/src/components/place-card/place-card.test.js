import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';
import {createStore} from 'redux';
import reducer from '../../reducers/index';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';
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

it(`Correctly render component ItemCard`, () => {
  const testHandler = jest.fn();
  const tree = renderer
  .create(
      <Provider store={createStore(reducer)}>
        <Router history={history}>
          <PlaceCard
            onClick={testHandler}
            onDeHover={testHandler}
            onHover={testHandler}
            index={mock[0].id}
            data={mock[0]}
          />
        </Router>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
