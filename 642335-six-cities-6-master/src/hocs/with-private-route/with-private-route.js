import React, {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {AppRoute} from "../../const";

const withPrivateRoute = (Component, isLoggedIn, URL = AppRoute.ROOT) => {

  class WithPrivateRoute extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      if (isLoggedIn) {
        return <Component {...this.props} />;
      } else {
        return <Redirect to={URL}/>;
      }
    }
  }

  return WithPrivateRoute;
};

export default withPrivateRoute;
