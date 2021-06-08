import React, {PureComponent} from 'react';
import {ActionCreator} from '../../reducers/data/data.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._handleActiveItem = this._handleActiveItem.bind(this);
    }

    render() {
      return <Component
        onActiveItemChange={this._handleActiveItem}
        {...this.props}/>;
    }

    _handleActiveItem(activeItem) {
      this.props.activeOffer(activeItem);
    }
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = (dispatch) => {
    return {
      activeOffer: (id) => dispatch(ActionCreator.activeOfferId(id))
    };
  };

  WithActiveItem.propTypes = {
    activeOffer: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveItem);
};

export default withActiveItem;
