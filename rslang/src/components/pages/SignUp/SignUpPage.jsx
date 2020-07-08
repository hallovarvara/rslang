import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import is from 'is_js';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import UserService from '../../../helpers/UserService';

const SignUpPage = () => {
  const userService = new UserService();

  const [email, setEmail] = React.useState('');
  const [name, setNick] = React.useState('');
  const [password, setPass] = React.useState('');
  const [repeatPass, setRepeatPass] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(true);
  const [nickValid, setNickValid] = React.useState(true);
  const [passValid, setPassValid] = React.useState(true);
  const [passRepeatValid, setPassRepeatValid] = React.useState(true);

  const isPassValid = (pass) => {
    const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    return setPassValid(reg.test(String(pass)));
  };
  const isNickValid = (nick) => {
    const reg = /^[a-zA-Z0-9._-]{3,15}$/g;
    return setNickValid(reg.test(String(nick)));
  };

  const isFormValid = () => {
    return emailValid && passValid && passRepeatValid && nickValid;

  };

  const onChangeEmail = (e) => {
    setEmailValid(is.email(e.target.value) && e.target.value);
    setEmail(e.target.value);
  };
  const onChangeNick = (e) => {
    setNick(e.target.value);
    isNickValid(e.target.value);
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
    isPassValid(e.target.value);
  };
  const onChangeRepeatPass = (e) => {
    setRepeatPass(e.target.value);
    if (password !== e.target.value) {
      setPassRepeatValid(false);
    } else { setPassRepeatValid(true); }
  };

  const onSubmitForm = async (e) => {
    console.log(name)
    e.preventDefault();
    if (password === repeatPass) {
      const data = await userService.registerUser({ name, email, password });
      console.log(data)
      setUserId(data.id);
    }
  };
  if (userId) {
    return (<Redirect to={'/sign-in'} />);
  }

  return (
    <section className="sign-up-page">
      <h2 className="sign-up-page__title">Sign up</h2>
      <form className="sign-up-form" onSubmit={onSubmitForm}>
        <Input
          required
          error={!nickValid}
          placeholder="Nickname"
          className="sign-up-form__email"
          onChange={onChangeNick} />
        <Input
          required
          error={!emailValid}
          placeholder="Email"
          className="sign-up-form__email"
          onChange={onChangeEmail} />
        <Input
          required
          error={!passValid}
          placeholder="Password"
          className="sign-up-form__password"
          onChange={onChangePass}
          type="password" />
        <Input
          required
          error={!passRepeatValid}
          placeholder="Repeat password"
          className="sign-up-form__repeat-password"
          onChange={onChangeRepeatPass}
          type="password" />

        <Button
          value="Sign up"
          className="sign-up-form__button"
          disabled={!isFormValid()} />

      </form>
      <p className="sign-up-page-additional-info">
        Already registered? <Link className="sign-up-page-additional-info__sign-in-link" to="/sign-in">Sign in</Link>
      </p>
    </section>
  );
};

export default SignUpPage;
