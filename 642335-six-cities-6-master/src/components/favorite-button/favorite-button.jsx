import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import history from "../../history.js";
import {useHistory} from "react-router-dom";


import {Operation} from "../../reducers/data/data.js";
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';

import {AppRoute} from "../../const.js";


const FavoriteButton = ({offer, isAuthorization, changeIsOfferFavorite}) => {
  let history = useHistory();
  const handleFavoriteButtonClick = () => isAuthorization === true ?
    changeIsOfferFavorite(offer.id, !offer.isFavorite) : history.push(AppRoute.LOGIN);

  return (

    offer.isFavorite ?
      <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={handleFavoriteButtonClick}>
        <svg className="place-card__bookmark-icon" width={18} height={19}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">In bookmarks</span>
      </button> :
      <button className="place-card__bookmark-button button" type="button" onClick={handleFavoriteButtonClick}>
        <svg className="place-card__bookmark-icon" width={18} height={19}>
          <use xlinkHref="#icon-bookmark" />
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
  );
};

FavoriteButton.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    degree: PropTypes.string,
    order: PropTypes.string,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
  isAuthorization: PropTypes.bool,
  changeIsOfferFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isAuthorization: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeIsOfferFavorite(offerId, isFavorite) {
    dispatch(Operation.changeIsOfferFavorite(offerId, isFavorite));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
