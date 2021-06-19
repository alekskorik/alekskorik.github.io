import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../../components/header/header.jsx';
import Gallery from '../../components/gallery/gallery.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import PlacesList from '../places-list/places-list.jsx';
import PropertyDescription from '../../components/property-description/property-description.jsx';
import {getCurrentOffer, getReviews, getNearbyOffers} from '../../reducers/data/selectors.js';
import {Operation} from '../../reducers/data/data.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
// import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';
const PlacesListWrapped = withActiveItem(PlacesList);


class Property extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offerId, loadReviews, loadNearbyOffers} = this.props;
    loadReviews(offerId);
    loadNearbyOffers(offerId);
  }

  componentDidUpdate(prevProps) {
    const {offerId, loadNearbyOffers, loadReviews} = this.props;
    if (prevProps.nearbyOffers === this.props.nearbyOffers) {
      loadNearbyOffers(offerId);
    }
    if (prevProps.offerId !== this.props.offerId) {
      loadReviews(offerId);
    }
  }

  render() {
    // const {offers, offerId} = this.props;
    // const offer = offers.find((el) => {
    //   return el.id === Number(offerId);
    // });
    const {offer, reviews, nearbyOffers} = this.props;
    if (!offer) {
      return null;
    }

    return <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <Gallery images={offer.images}/>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyDescription offer={offer} />
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="property__map map"><Map offers={nearbyOffers} /></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesListWrapped offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>;
  }
}

const mapStateToProps = (state, {offerId}) => {
  return {
    offer: getCurrentOffer(offerId)(state),
    reviews: getReviews(state),
    nearbyOffers: getNearbyOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: (id) => dispatch(Operation.loadReviews(id)),
    loadNearbyOffers: (id) => dispatch(Operation.loadNearbyOffers(id)),
  };
};

Property.propTypes = {
  offer: PropTypes.object,
  reviews: PropTypes.array,
  nearbyOffers: PropTypes.array,
  loadReviews: PropTypes.func,
  offerId: PropTypes.number,
  loadNearbyOffers: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Property);
