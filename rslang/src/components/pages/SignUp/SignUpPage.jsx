import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';

const SignUpPage = () => (
  <section className="sign-up-page">
    <h2 className="sign-up-page__title">Sign up</h2>
    <form className="sign-up-form">
      <Input placeholder="Email" className="sign-up-form__email"/>
      <Input placeholder="Password" className="sign-up-form__password"/>
      <Input placeholder="Repeat password" className="sign-up-form__repeat-password"/>
      <Button value="Sign up" className="sign-up-form__button"/>
    </form>
    <p className="sign-up-page-additional-info">
      Already registered? <Link className="sign-up-page-additional-info__sign-in-link" to="/sign-in">Sign in</Link>
    </p>
  </section>
);

export default SignUpPage;
