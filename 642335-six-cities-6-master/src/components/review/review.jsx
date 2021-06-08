import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Rating from '../rating/rating.jsx';

export default class Review extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;
    const options = {
      month: `long`,
      day: `numeric`,
      year: `numeric`,
    };
    return <React.Fragment>
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={review.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {review.user.name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <Rating rating={review.rating} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {review.comment}
          </p>
          <time className="reviews__time" dateTime={review.date}>{new Date(review.date).toLocaleDateString(`en-US`, options)}</time>
        </div>
      </li>
    </React.Fragment>;
  }
}

Review.propTypes = {
  review: PropTypes.object,
};
