import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../rating/rating.jsx';
import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';

const PropertyDescription = ({offer}) => {
  return <React.Fragment>
    {offer.isPremium ?
      <div className="property__mark">
        <span>Premium</span>
      </div> : ``}
    <div className="property__name-wrapper">
      <h1 className="property__name">{offer.title}</h1>
      <button className="property__bookmark-button button" type="button">
        <FavoriteButton offer={offer} isBig={true} />
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <Rating rating={offer.rating} />
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="property__rating-value rating__value">{offer.rating}</span>
    </div>
    <ul className="property__features">
      <li className="property__feature property__feature--entire">{offer.type}</li>
      <li className="property__feature property__feature--bedrooms">{offer.bedrooms + ` Bedrooms`}</li>
      <li className="property__feature property__feature--adults">{`Max ` + offer.maxAdults + ` adults`}</li>
    </ul>
    <div className="property__price">
      <b className="property__price-value">&euro;{offer.price}</b>
      <span className="property__price-text">&nbsp;night</span>
    </div>
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {offer.goods.map((item, index) => <li key={index} className="property__inside-item">
          {item}
        </li>)}
      </ul>
    </div>
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper` + offer.host.isPro ? `property__avatar-wrapper--pro` : `` + `user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={offer.host.avatarURL} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">{offer.host.name}</span>
      </div>
      <div className="property__description">
        <p className="property__text">{offer.description}</p>
      </div>
    </div>
  </React.Fragment>;
};

PropertyDescription.propTypes = {
  offer: PropTypes.object.isRequired
};

export default PropertyDescription;
