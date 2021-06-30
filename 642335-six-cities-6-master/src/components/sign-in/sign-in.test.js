import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../reducers/index.js';
import {Router} from 'react-router-dom';
import history from '../../history';

const store = createStore(reducer);

it(`Test SignIn Component`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn />
          </Router>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
