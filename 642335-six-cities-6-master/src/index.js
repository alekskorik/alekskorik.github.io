import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
// import offers from './mocks/offers.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';

import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {createAPI} from './api.js';
import {AppRoute} from './const.js';
// import {Router} from 'react-router-dom';


import {Operation} from './reducers/data/data.js';

// const api = createAPI((...args) => store.dispatch(...args));
const api = createAPI(() => history.push(AppRoute.LOGIN));

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);
const init = () => {
  store.dispatch(Operation.loadOffers());
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , document.getElementById(`root`)
  );
};

init();
