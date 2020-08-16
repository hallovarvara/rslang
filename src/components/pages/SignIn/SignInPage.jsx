import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../../basicComponents/Input';
import { auth } from '../../../redux/actions/auth';

import {
  pagesData,
  text,
} from '../../../helpers/constants';

import LiquidButton from '../../../basicComponents/LiquidButton';
import { ReactComponent as Spot } from '../../../assets/icons/spot.svg';

const initialState = {
  email: '',
  password: '',
  repeatPass: '',
  userId: '',
  emailValid: true,
};

class SignInPage extends Component {
  state = { ...initialState };

  isEmailValid = (mail) => {
    // eslint-disable-next-line no-control-regex
    const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g;
    this.setState({ emailValid: reg.test(String(mail)) });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    this.isEmailValid(e.target.value);
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitForm = async (event) => {
    const { email, password } = this.state;
    try {
      event.preventDefault();
      this.props.auth(email, password);
    } catch (e) {
      console.log(e);
      // TODO handle error for showing user
    }
  };

  render() {
    const { emailValid } = this.state;
    const { token } = this.props;
    if (token) {
      return (<Redirect to={`/${pagesData.learnWords.path}`} />);
    }
    return (
      <section className="sign-in-page">
        <h1>{ pagesData.signIn.title }</h1>
        <form className="sign-in-form" onSubmit={this.onSubmitForm}>
          <Input
            error={!emailValid}
            placeholder={ text.ru.email }
            className="sign-in-form__email"
            onChange={this.onChangeEmail}
          />
          <Input
            type="password"
            placeholder={ text.ru.password }
            className="sign-in-form__password"
            onChange={this.onChangePass}
          />
          <LiquidButton
            text={pagesData.signIn.title}
            className="sign-in-form__button"
          />
        </form>
        <p className="sign-in-page-additional-info">
          { text.ru.firstTimeOrForgotPassword } <Link
          className="sign-in-page-additional-info__sign-up-link"
          to={ `/${pagesData.register.path}` }
        >
          { pagesData.register.title }
        </Link>
        </p>
        <Spot className="spot"/>
      </section>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
  };
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

SignInPage.propTypes = {
  token: PropTypes.string,
  auth: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
