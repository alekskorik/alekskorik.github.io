import React from 'react';
import renderer from 'react-test-renderer';
import PropertyDescription from './property-description.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';

const mock = {
  isPremium: true,
  previewImage: ``,
  price: 222,
  isFavorite: true,
  id: 1,
  title: ``,
  type: ``,
  goods: [`1`, `2`],
  host: {
    avatarURL: `1`
  }
};

it(`Test FavoriteCard Component`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <PropertyDescription offer={mock}/>
          </Router>
        </Provider>
    )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
