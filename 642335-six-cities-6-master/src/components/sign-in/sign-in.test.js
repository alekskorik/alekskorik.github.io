import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../reducers/index.js';

const store = createStore(reducer);

it(`Test SignIn Component`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <SignIn />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
