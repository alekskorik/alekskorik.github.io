import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';

it(`Test Header Component`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <Header isLoggedIn={true} userData={{email: `mail`}}/>
          </Router>
        </Provider>
    )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
