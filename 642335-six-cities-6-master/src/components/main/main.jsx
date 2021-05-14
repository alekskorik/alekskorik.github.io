import React from 'react';
import PropTypes from 'prop-types';
import PlacesList from '../places-list/places-list.jsx';
import Map from '../map/map.jsx';
import {connect} from 'react-redux';
import CityList from '../city-list/city-list.jsx';
import {ActionCreator} from '../../reducers/user/user.js';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

import {getUserData, getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {getCurrentOffers, getCitiesList} from '../../reducers/data/selectors.js';
import {getCurrentCity} from '../../reducers/user/selectors.js';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";
// import SignIn from '../sign-in/sign-in.jsx';
// import {withAuthorization} from '../../hocs/with-authorization/with-authorization.js';

// const SignInWrapped = withAuthorization(SignIn);
const PlacesListWrapped = withActiveItem(PlacesList);
const CityListWrapped = withActiveItem(CityList);

const MainPage = ({offers, cities, onChangeCity, currentCity, userData, auth}) => {
  const {email} = userData;
  // let offersAmount = offers.filter((el) => el.city === currentCity).length;
  // console.log(data);
  console.log(offers);
  return <div>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
    </div>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={auth ? AppRoute.FAVORITES : AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span
                    className="header__user-name user__name">{auth ? email : `Sign in`}</span>
                </Link>

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityListWrapped
            onChangeCity={onChangeCity}
            currentCity={currentCity}
            cities={cities}/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">

            <PlacesListWrapped
              city={currentCity}
              offers={offers} />

          </section>
          <div className="cities__right-section">
            <section className="cities__map map" >
              <Map cards={offers} />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>;
};

MainPage.propTypes = {
  // placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  cities: PropTypes.object,
  onChangeCity: PropTypes.func,
  currentCity: PropTypes.string,
  userData: PropTypes.object,
  auth: PropTypes.bool
};


const mapStateToProps = (state) => {
  return {
    offers: getCurrentOffers(state),
    cities: getCitiesList(state),
    currentCity: getCurrentCity(state),
    userData: getUserData(state),
    auth: getAuthorizationStatus(state)
  };
};


const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (city) => dispatch(ActionCreator.changeCity(city)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
