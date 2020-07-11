import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import UserServiceApi from '../../../helpers/userService';
import { pagesData, text } from '../../../helpers/constants';

const SignUpPage = () => {
  const userService = new UserServiceApi();

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

  const isEmailValid = (mail) => {
    // eslint-disable-next-line no-control-regex
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return setEmailValid(reg.test(String(mail)));
  };

  const isFormValid = () => emailValid && passValid && passRepeatValid && nickValid;

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    isEmailValid(e.target.value);
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
    setPassRepeatValid(password === e.target.value);
  };

  const onSubmitForm = async (e) => {
    console.log(name);
    e.preventDefault();
    if (password === repeatPass) {
      const data = await userService.registerUser({ name, email, password });
      console.log(data);
      setUserId(data.id);
    }
  };
  if (userId) {
    return (<Redirect to={`/${pagesData.signIn.path}`} />);
  }

  return (
    <section className="sign-up-page">
      <h1>{ pagesData.register.title }</h1>
      <form className="sign-up-form" onSubmit={onSubmitForm}>
        <Input
          required
          error={!nickValid}
          placeholder={ text.ru.nickname }
          className="sign-up-form__email"
          onChange={onChangeNick} />
        <Input
          required
          error={!emailValid}
          placeholder={ text.ru.email }
          className="sign-up-form__email"
          onChange={onChangeEmail} />
        <Input
          required
          error={!passValid}
          placeholder={ text.ru.password }
          className="sign-up-form__password"
          onChange={onChangePass}
          type="password" />
        <Input
          required
          error={!passRepeatValid}
          placeholder={ text.ru.repeatPassword }
          className="sign-up-form__repeat-password"
          onChange={onChangeRepeatPass}
          type="password" />

        <Button
          value={ pagesData.register.title }
          className="sign-up-form__button"
          disabled={!isFormValid()} />

      </form>
      <p className="sign-up-page-additional-info">
        { text.ru.alreadyRegistered } <Link
          className="sign-up-page-additional-info__sign-in-link"
          to="/sign-in">
          {pagesData.signIn.title}
        </Link>
      </p>
    </section>
  );
};

export default SignUpPage;
