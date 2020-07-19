import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../../../basicComponents/Input';
import UserService from '../../../helpers/userService';
import { text, pagesData } from '../../../helpers/constants';

import LiquidButton from '../../../basicComponents/LiquidButton';
import { ReactComponent as Spot } from '../../../assets/icons/spot.svg';

const userService = new UserService();

const initialState = {
  email: '',
  name: '',
  password: '',
  repeatPass: '',
  userId: '',
  emailValid: true,
  nickValid: true,
  passValid: true,
  passRepeatValid: true,
  formValid: false,
};

class SignUpPage extends Component {
  state = { ...initialState };

  isPassValid = (pass) => {
    const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    this.setState({ passValid: reg.test(String(pass)) });
  };

  isNickValid = (nick) => {
    const reg = /^[a-zA-Z0-9._-]{3,15}$/g;
    this.setState({ nickValid: reg.test(String(nick)) });
  };

  isEmailValid = (mail) => {
    const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g;
    this.setState({ emailValid: reg.test(String(mail)) });
  };

  isFormValid = () => {
    const {
      emailValid, passValid, passRepeatValid, nickValid,
    } = this.state;
    return emailValid && passValid && passRepeatValid && nickValid;
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    this.isEmailValid(e.target.value);
  };

  onChangeNick = (e) => {
    this.setState({ name: e.target.value });
    this.isNickValid(e.target.value);
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
    this.isPassValid(e.target.value);
  };

  onChangeRepeatPass = (e) => {
    this.isFormValid();
    this.setState({ repeatPass: e.target.value });
    if (this.state.password !== e.target.value) {
      this.setState({ passRepeatValid: false });
    } else { this.setState({ passRepeatValid: true }); }
  };

  onSubmitForm = async (e) => {
    const {
      name, email, password, repeatPass,
    } = this.state;
    e.preventDefault();
    if (password === repeatPass) {
      const data = await userService.registerUser({ name, email, password });
      this.setState({ userId: data.id });
    }
  };

  render() {
    const {
      nickValid, emailValid, passValid, passRepeatValid, userId,
    } = this.state;
    if (userId) {
      return (<Redirect to={'/sign-in'} />);
    }
    return (
      <section className="sign-up-page">
        <h1>{ pagesData.register.title }</h1>
        <form className="sign-up-form" onSubmit={this.onSubmitForm}>
          <Input
            required
            error={!nickValid}
            placeholder={ text.ru.nickname }
            className="sign-up-form__email"
            onChange={this.onChangeNick} />
          <Input
            required
            error={!emailValid}
            placeholder={ text.ru.email }
            className="sign-up-form__email"
            onChange={this.onChangeEmail} />
          <Input
            required
            error={!passValid}
            placeholder={ text.ru.password }
            className="sign-up-form__password"
            onChange={this.onChangePass}
            type="password" />
          <Input
            required
            error={!passRepeatValid}
            placeholder={ text.ru.repeatPassword }
            className="sign-up-form__repeat-password"
            onChange={this.onChangeRepeatPass}
            type="password" />
          <LiquidButton
            text={pagesData.register.title}
            className="sign-up-form__button"
            disabled={!this.isFormValid()}
          />
        </form>
        <p className="sign-up-page-additional-info">
          { text.ru.alreadyRegistered } <Link
          className="sign-up-page-additional-info__sign-in-link"
          to="/sign-in">
          {pagesData.signIn.title}
        </Link>
        </p>
        <Spot className="spot"/>
      </section>
    );
  }
}

export default SignUpPage;
