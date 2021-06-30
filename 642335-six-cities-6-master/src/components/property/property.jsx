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
import AddReview from '../add-review/add-review.jsx';
import Map from '../map/map.jsx';
// import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';
const PlacesListWrapped = withActiveItem(PlacesList);
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import withAddingReview from '../../hocs/with-adding-review/with-adding-review.jsx';

const AddReviewWrapped = withAddingReview(AddReview);

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
    const {offer, reviews, nearbyOffers, isAuthorization, offerId} = this.props;
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
                {isAuthorization ? <AddReviewWrapped offerId={offerId} /> : ``}
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
    isAuthorization: getAuthorizationStatus(state),
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
  isAuthorization: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(Property);
