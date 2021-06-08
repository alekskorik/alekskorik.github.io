import React from 'react';
import MainPage from '../main/main.jsx';
// import SignIn from '../sign-in/sign-in.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BrowserRouter} from "react-router-dom";
import history from "../../history.js";
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
// import {withAuthorization} from '../../hocs/with-authorization/with-authorization.js';
// import {AppRoute} from "../../const";
import withRoutes from "../../hocs/with-routes/with-routes.js";
const MainPageWrapped = withRoutes(MainPage);
// const SignInWrapped = withAuthorization(SignIn);

const App = (isAuthorization) => {
  return (<BrowserRouter history={history}>
    <MainPageWrapped isLoggedIn={isAuthorization.isAuthorization}/>;
  </BrowserRouter>
  );
};


const mapStateToProps = (state) => {
  return {
    isAuthorization: getAuthorizationStatus(state),
  };
};

App.propTypes = {
  getRoute: PropTypes.func,
  isAuthorization: PropTypes.bool
};

export default connect(mapStateToProps)(App);
