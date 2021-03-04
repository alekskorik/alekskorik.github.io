import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Setting = {
  // PLACES_COUNT: 312,
  placesName: [
    {title: `Beautiful & luxurious apartment at great location`},
    {title: `Wood and stone place`},
    {title: `Canal View Prinsengracht`},
    {title: `Nice, cozy, warm big bed apartment`},
  ]
};

ReactDOM.render(
    <App placesName={Setting.placesName}/>,
    document.querySelector(`#root`)
);
