import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteButton from './favorite-button.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index.js';

it(`Test FavoriteButton Component`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <FavoriteButton />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
