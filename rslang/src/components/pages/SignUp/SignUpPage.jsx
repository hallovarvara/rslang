import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import {pagesData} from "../../../helpers/constants";

const SignUpPage = () => (
  <section className="sign-up-page">
    <h1>{pagesData.register.title}</h1>
    <form className="sign-up-form">
      <Input type="email" placeholder="Емейл" className="sign-up-form__email"/>
      <Input type="password" placeholder="Пароль" className="sign-up-form__password"/>
      <Input type="password" placeholder="Повторите пароль" className="sign-up-form__repeat-password"/>
      <Button value={pagesData.register.title} className="sign-up-form__button"/>
    </form>
    <p className="sign-up-page-additional-info">
      Уже зарегистрированы? <Link className="sign-up-page-additional-info__sign-in-link" to="/sign-in">{pagesData.signIn.title}</Link>
    </p>
  </section>
);

export default SignUpPage;
