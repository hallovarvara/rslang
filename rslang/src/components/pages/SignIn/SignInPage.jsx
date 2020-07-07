import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import { pagesData } from "../../../helpers/constants";

const SignInPage = () => (
  <section className="sign-in-page">
    <h1>{pagesData.signIn.title}</h1>
    <form className="sign-in-form">
      <Input type="email" placeholder="Емейл" className="sign-in-form__email"/>
      <Input type="password" placeholder="Пароль" className="sign-in-form__password"/>
      <Button value={pagesData.signIn.title} className="sign-in-form__button"/>
    </form>
    <p className="sign-in-page-additional-info">
      Впервые тут или забыли пароль? <Link className="sign-in-page-additional-info__sign-up-link" to={pagesData.register.path}>{pagesData.register.title}</Link>
    </p>
  </section>
);

export default SignInPage;
