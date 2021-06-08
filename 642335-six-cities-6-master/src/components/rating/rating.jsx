import React from 'react';
import PropTypes from 'prop-types';
import {switchRating} from "../../const.js";

const Rating = ({rating}) => {
  return <span style={{width: `${switchRating(rating)}`}} />;
};

Rating.propTypes = {
  rating: PropTypes.number
};

export default Rating;
