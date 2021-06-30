import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getUserData} from '../../reducers/user/selectors';
import {getFavoriteOffers, getFavoriteCities} from '../../reducers/data/selectors.js';
import {Operation} from '../../reducers/data/data.js';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";
import FavoriteList from './favorite-list.jsx';
import Header from '../../components/header/header.jsx';

class Favorite extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadFavorite();
  }

  render() {
    const {offers, cities} = this.props;
    if (offers.length === 0) {
      return <React.Fragment>
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      </React.Fragment>;
      // return <FavoriteEmpty />;
    }
    return <React.Fragment>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList offers={offers} cities={cities}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </React.Fragment>;

  }


}

Favorite.propTypes = {
  isLoggedIn: PropTypes.bool,
  userData: PropTypes.object,
  loadFavorite: PropTypes.func,
  offers: PropTypes.array,
  cities: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userData: getUserData(state),
    offers: getFavoriteOffers(state),
    cities: getFavoriteCities(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFavorite: () => dispatch(Operation.loadFavorite())
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
