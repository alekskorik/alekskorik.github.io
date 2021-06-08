import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';

export default class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;

    return <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => {

          return <Review
            review={review}
            key={review.id}
          />;
        })}
      </ul>;
    </React.Fragment>;
  }
}

ReviewsList.propTypes = {
  reviews: PropTypes.array,
};
