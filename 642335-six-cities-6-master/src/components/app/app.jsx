import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main/main.jsx';

const App = (props) => {
  const {data} = props;
  return <MainPage offers={data} />;
};

App.propTypes = {
  // placesCount: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
