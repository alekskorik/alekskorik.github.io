import React from 'react';
import MainPage from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {connect} from 'react-redux';
import {Switch, Route, Router as BrowserRouter, Redirect} from "react-router-dom";
import history from "../../history.js";
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {withAuthorization} from '../../hocs/with-authorization/with-authorization.js';
import {AppRoute} from "../../const";

const SignInWrapped = withAuthorization(SignIn);

const App = (isAuthorization) => {
  console.log(isAuthorization);
  return (<BrowserRouter history={history}>
    <Switch>
      <Route path={AppRoute.ROOT} exact component={MainPage} />
Debugger
      <Route path={AppRoute.LOGIN} exact component={SignInWrapped} />
    </Switch>
  </BrowserRouter>
  );
};
// <BrowserRouter history={history}>
//   <Switch>
//     <Route exact        path={AppRoute.ROOT}        render={({history}) => (
//         <MainPage />
//       )}
//     />
// <Route exact
//   path={AppRoute.LOGIN}
//   render={({history}) => (
//     <SignInWrapped />
//   )}
// />
//   </Switch>
// </BrowserRouter>

const mapStateToProps = (state) => {
  return {
    isAuthorization: getAuthorizationStatus(state),
  };
};

export default connect(mapStateToProps)(App);

// // if (isAuthorization.isAuthorization === false) {
// return <MainPage />;
//  } else {
// //   return <SignInWrapped />;
// // }


//         render={() => authorizationStatus === AuthorizationStatus.NOT_AUTH ? <SignIn /> : <Redirect to={AppRoute.ROOT} />}


// render={() => isAuthorization.isAuthorization === true ? <SignInWrapped /> : <Redirect to={AppRoute.ROOT} />}
