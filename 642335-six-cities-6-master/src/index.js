import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offers from './mocks/offers.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
// console.log(offers);

import reducer from './reducer';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App
        data={offers}
      />
    </Provider>
    , document.getElementById(`root`)
);
