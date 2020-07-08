import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import is from 'is_js';
import { connect } from 'react-redux';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import { auth } from '../../../redux/actions/auth';

const SignInPage = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(true);

  const onChangeEmail = (e) => {
    setEmailValid(is.email(e.target.value) && e.target.value);
    setEmail(e.target.value);
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      props.auth(email, password);
    } catch (event) {
      console.log(event);
    }
  };
  if (props.token) {
    return (<Redirect to={'/'} />);
  }
  return (
    <section className="sign-in-page">
      <h2 className="sign-in-page__title">Sign in</h2>
      <form className="sign-in-form" onSubmit={onSubmitForm}>
        <Input
          error={!emailValid}
          placeholder="Email"
          className="sign-in-form__email"
          onChange={onChangeEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          className="sign-in-form__password"
          onChange={onChangePass}
        />
        <Button value="Log in" className="sign-in-form__button" />
      </form>
      <p className="sign-in-page-additional-info">
        First time here or forgot password?
        <Link className="sign-in-page-additional-info__sign-up-link" to="/register">Sign up</Link>
      </p>
    </section>
  );
};
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
