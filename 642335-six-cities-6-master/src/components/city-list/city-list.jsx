import React from 'react';
import PropTypes from 'prop-types';

const CityList = ({onChangeCity, cities}) => {
  return <ul className="locations__list tabs__list">
    {Array.from(cities).map((city) => <li key={city} className="locations__item">
      <a
        onClick={(evt) => {
          evt.preventDefault();
          onChangeCity(city);
        }}
        className="locations__item-link tabs__item"
        href="#">
        <span>{city}</span>
      </a>
    </li>)}
  </ul>;
};

CityList.propTypes = {
  onChangeCity: PropTypes.func,
  cities: PropTypes.object
};

export default CityList;
