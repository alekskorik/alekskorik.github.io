import React from 'react';
import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '../rating/rating.jsx';
import {AppRoute} from "../../const";


const FavoriteCard = ({offer}) => {
  return <React.Fragment>
    <article className="favorites__card place-card">
      {offer.isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offer={offer} />;
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <Rating rating={offer.rating} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.OFFER + `/` + offer.id} >{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  </React.Fragment>;
};

FavoriteCard.propTypes = {
  offer: PropTypes.object
};

export default FavoriteCard;
