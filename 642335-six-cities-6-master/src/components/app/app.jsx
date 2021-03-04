import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main/main.jsx';

const App = (props) => {
  const {placesName} = props;
  return <MainPage placesName={placesName} />;
};

App.propTypes = {
  // placesCount: PropTypes.number.isRequired,
  placesName: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  }))
};

export default App;
