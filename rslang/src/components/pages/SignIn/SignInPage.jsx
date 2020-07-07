import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import {pagesData} from "../../../helpers/constants";

const SignInPage = () => (
  <section className="sign-in-page">
    <h2 className="sign-in-page__title">{pagesData.signIn.title}</h2>
    <form className="sign-in-form">
      <Input placeholder="Email" className="sign-in-form__email"/>
      <Input placeholder="Password" className="sign-in-form__password"/>
      <Button value="Log in" className="sign-in-form__button"/>
    </form>
    <p className="sign-in-page-additional-info">
      First time here or forgot password? <Link className="sign-in-page-additional-info__sign-up-link" to="/sign-up">Sign up</Link>
    </p>
  </section>
);

export default SignInPage;
