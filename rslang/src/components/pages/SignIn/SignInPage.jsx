import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import is from 'is_js';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import { pagesData } from "../../../helpers/constants";
import { connect } from 'react-redux'

import UserService from '../../../helpers/UserService';

const SignInPage = () => {
  const userService = new UserService();

  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [token, setToken] = React.useState('');
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
      console.log(userService.loginUser({ email, password }));
      const data = await userService.loginUser({ email, password });
      setUserId(data.userId);
      setToken(data.token);
    } catch (e) {
      console.log(e)
    }

  };
  if (userId && token) {
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
        First time here or forgot password? <Link className="sign-in-page-additional-info__sign-up-link" to="/sign-up">Sign up</Link>
      </p>
    </section>
  );
};

export default SignInPage;
