import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {Operation} from '../../reducers/user/user.js';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";

const SignIn = ({emailValue,
  passwordValue,
  onChangeEmail,
  onChangePassword,
  userLogin}) => {
  return <React.Fragment>
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                userLogin(emailValue, passwordValue);
              }}
              className="login__form form"
              action="#"
              method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={emailValue}
                  onChange={onChangeEmail}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={passwordValue}
                  onChange={onChangePassword}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  </React.Fragment>;
};


const mapStateToProps = (state) => {
  return {
    isAuthorization: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email, password) => dispatch(Operation.userSaveData(email, password))
});

SignIn.propTypes = {
  userLogin: PropTypes.func,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
