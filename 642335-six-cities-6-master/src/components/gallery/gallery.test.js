import React from 'react';
import renderer from 'react-test-renderer';
import Gallery from './gallery.jsx';

import {Router} from 'react-router-dom';
import history from '../../history';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';

const mockImages = [`1`, `2`, `3`, `4`, `5`, `6`, `7`];

it(`Test FavoriteCard Component`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <Gallery images={mockImages}/>
          </Router>
        </Provider>
    )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
