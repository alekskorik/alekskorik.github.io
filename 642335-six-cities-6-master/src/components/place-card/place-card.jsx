import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";
import Rating from '../rating/rating.jsx';


export default class PlaceCard extends Component {

  constructor(props) {
    super(props);

  }
  render() {
    const {
      id,
      title,
      type,
      previewImage,
      price,
      rating,
      isPremium} = this.props.data;
    const {onClickActiveCard, activeIndex} = this.props;
    return (
      <article
        onMouseEnter={(evt) => {
          evt.preventDefault();
          onClickActiveCard(activeIndex);
        }}
        className="cities__place-card place-card">
        {isPremium ? <div className="place-card__mark">
          <span>Premium</span>
        </div> : ``}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#" >
            <img
              className="place-card__image"
              src={previewImage}
              width={260}
              height={200}
              alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <FavoriteButton offer={this.props.data} />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <Rating rating={rating} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={AppRoute.OFFER + `/` + id} >{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onClickActiveCard: PropTypes.func,
  onHover: PropTypes.func,
  activeIndex: PropTypes.number,
  data: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    isPremium: PropTypes.bool,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};
