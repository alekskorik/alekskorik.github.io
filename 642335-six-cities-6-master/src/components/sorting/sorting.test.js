import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';


it(`Test SortingOption Component`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <Sorting />
          </Router>
        </Provider>
    )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
