import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SortingOptions} from '../../const.js';


const activeOptions = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

class Sorting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {menuStatus, menuChange, onSort, activeItem} = this.props;
    return <React.Fragment>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          onClick={() => {
            menuChange();
          }}
          className="places__sorting-type" tabIndex={0} >
          {activeOptions[activeItem - 1]}
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${menuStatus ? `places__options--opened` : ``}`}>
          <li onClick={() => {
            onSort(SortingOptions.Popular);
          }}
          className={`places__option ${activeItem === 1 ? `places__option--active` : ``}`}
          tabIndex={0}>Popular</li>
          <li
            onClick={() => {
              onSort(SortingOptions.LowToHigh);
            }}
            className={`places__option ${activeItem === 2 ? `places__option--active` : ``}`}
            tabIndex={0}>Price: low to high</li>
          <li
            onClick={() => {
              onSort(SortingOptions.HighToLow);
            }}
            className={`places__option ${activeItem === 3 ? `places__option--active` : ``}`}
            tabIndex={0}>Price: high to low</li>
          <li
            onClick={() => {
              onSort(SortingOptions.ByRating);
            }}
            className={`places__option ${activeItem === 4 ? `places__option--active` : ``}`}
            tabIndex={0}>Top rated first</li>
        </ul>
      </form>
    </React.Fragment>;
  }
}

Sorting.propTypes = {
  menuChange: PropTypes.func,
  menuStatus: PropTypes.bool,
  onSort: PropTypes.func,
  activeItem: PropTypes.number
};

export default Sorting;
