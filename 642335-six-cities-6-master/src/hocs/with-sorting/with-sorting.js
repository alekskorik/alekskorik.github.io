import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/data/data.js';
import {getOffers} from '../../reducers/data/selectors.js';
import {SortingOptions} from '../../const.js';
import PropTypes from 'prop-types';

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isMenuOpen: false,
        activeItem: 1
      };

      this._changeMenuStatus = this._changeMenuStatus.bind(this);
      this._onSorting = this._onSorting.bind(this);
    }


    _onSorting(option) {
      const {allOffers, sorting} = this.props;
      // const standartOffers = [...allOffers];
      // console.log(standartOffers);
      switch (option) {
        case SortingOptions.Popular:
          this.setState({
            activeItem: 1
          });
          sorting([...allOffers]);
          break;
        case SortingOptions.HighToLow:
          this.setState({
            activeItem: 2
          });
          sorting([...allOffers].sort((a, b) => {
            return b.price - a.price;
          }));
          break;
        case SortingOptions.LowToHigh:
          this.setState({
            activeItem: 3
          });
          sorting([...allOffers].sort((a, b) => {
            return a.price - b.price;
          }));
          break;
        case SortingOptions.ByRating:
          this.setState({
            activeItem: 4
          });
          sorting([...allOffers].sort((a, b) => {
            return b.rating - a.rating;
          }));
          break;
      }
    }


    _changeMenuStatus() {
      this.setState({
        isMenuOpen: !this.state.isMenuOpen
      });
    }


    render() {
      return <Component
        onSort={this._onSorting}
        menuStatus={this.state.isMenuOpen}
        menuChange={this._changeMenuStatus}
        activeItem={this.state.activeItem}
        {...this.props}/>;
    }
  }
  const mapStateToProps = (state) => ({
    allOffers: getOffers(state),
    // standartOffers: getCurrentOffers(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    sorting: (offers) => dispatch(ActionCreator.loadOffers(offers)),
  });

  WithSorting.propTypes = {
    allOffers: PropTypes.array,
    sorting: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithSorting);
};

export default withSorting;
