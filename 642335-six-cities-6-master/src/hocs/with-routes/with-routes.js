import React from 'react';
import PropTypes from 'prop-types';

import {Switch, Route, Redirect} from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.jsx';
import Favorites from '../../components/favorites/favorites.jsx';

import {withAuthorization} from '../../hocs/with-authorization/with-authorization.js';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route.js';


const SignInWrapped = withAuthorization(SignIn);
import {AppRoute} from "../../const.js";

export const withRoutes = (Component) => {
  class WithRoutes extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {isLoggedIn} = this.props;
      const SignInWrappedPrivate = withPrivateRoute(SignInWrapped, !isLoggedIn);
      const FavoritesPrivate = withPrivateRoute(Favorites, isLoggedIn, AppRoute.LOGIN);
      return (
        <Switch>
          <Route path={AppRoute.ROOT} exact render = {() => {
            return <Component {...this.props}/>;
          } }/>
          <Route path={AppRoute.LOGIN} exact component={SignInWrappedPrivate} />
          <Route path={AppRoute.FAVORITES} exact component={FavoritesPrivate} />

          <Redirect to={AppRoute.ROOT} />
        </Switch>
      );
    }
  }

  WithRoutes.propTypes = {
    isLoggedIn: PropTypes.bool
  };

  return WithRoutes;
};

export default withRoutes;
