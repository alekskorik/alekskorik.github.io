import React, {PureComponent} from 'react';

export const withAuthorization = (Component) => {
  class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this.changeValueEmail = this.changeValueEmail.bind(this);
      this.changeValuePassword = this.changeValuePassword.bind(this);
    }

    render() {
      return <Component
        onChangeEmail = {this.changeValueEmail}
        onChangePassword = {this.changeValuePassword}
        emailValue = {this.state.email}
        passwordValue = {this.state.password}
        {...this.props} />;

    }

    changeValueEmail(evt) {
      this.setState({email: evt.target.value});
    }

    changeValuePassword(evt) {
      this.setState({password: evt.target.value});
    }
  }
  return WithAuthorization;
};
