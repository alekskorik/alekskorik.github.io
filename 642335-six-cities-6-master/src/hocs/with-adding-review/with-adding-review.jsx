import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Operation} from '../../reducers/data/data.js';
import PropTypes from 'prop-types';

const withAddingReview = (Component) => {
  class WithAddingReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        isSubmitActive: false
      };
      this._onChangeRating = this._onChangeRating.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._onSubmit = this._onSubmit.bind(this);
    }


    _onChangeRating(value) {
      this.setState({rating: value});
    }

    _onChangeText(value) {
      this.setState({comment: value});
      this._activeButton();
    }


    _activeButton() {
      if (this.state.comment.length >= 50 && this.state.comment.length <= 300) {
        this.setState({isSubmitActive: true});
      } else {
        this.setState({isSubmitActive: false});
      }
    }

    _onSubmit() {
      const {upload, offerId} = this.props;
      const {rating, comment} = this.state;
      upload(rating, comment, offerId);
    }

    render() {
      return <Component
        onSubmit={this._onSubmit}
        isSubmitActive={this.state.isSubmitActive}
        onChangeText={this._onChangeText}
        onChangeRating={this._onChangeRating}
        {...this.props}/>;
    }
  }

  WithAddingReview.propTypes = {
    upload: PropTypes.func,
    offerId: PropTypes.number,
  };

  const mapDispatchToProps = (dispatch) => ({
    upload: (rating, comment, offerId) => dispatch(Operation.uploadReview(rating, comment, offerId))
  });

  return connect(null, mapDispatchToProps)(WithAddingReview);

};

export default withAddingReview;
