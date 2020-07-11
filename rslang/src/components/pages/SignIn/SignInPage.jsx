import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import { auth } from '../../../redux/actions/auth';

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
    const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
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
    }
  };

  render() {
    const { emailValid } = this.state;
    const { token } = this.props;
    if (token) {
      return (<Redirect to={'/'} />);
    }
    return (
      <section className="sign-in-page" >
        <h2 className="sign-in-page__title">Sign in</h2>
        <form className="sign-in-form" onSubmit={this.onSubmitForm}>
          <Input
            error={!emailValid}
            placeholder="Email"
            className="sign-in-form__email"
            onChange={this.onChangeEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            className="sign-in-form__password"
            onChange={this.onChangePass}
          />
          <Button value="Log in" className="sign-in-form__button" />
        </form>
        <p className="sign-in-page-additional-info">
          First time here or forgot password?
          <Link className="sign-in-page-additional-info__sign-up-link" to="/register">Sign up</Link>
        </p>
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
