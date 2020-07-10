import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../../basicComponents/Input';
import Button from '../../../basicComponents/Button';
import { auth } from '../../../redux/actions/auth';
import { pagesData, text} from '../../../helpers/constants';

const SignInPage = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(true);

  const isEmailValid = (mail) => {
    // eslint-disable-next-line no-control-regex
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return setEmailValid(reg.test(String(mail)));
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    isEmailValid(e.target.value);
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
      // TODO handle error for showing user
    }
  };
  if (props.token) {
    return (<Redirect to='/' />);
  }
  return (
    <section className="sign-in-page">
      <h1>{ pagesData.signIn.title }</h1>
      <form className="sign-in-form" onSubmit={onSubmitForm}>
        <Input
          error={!emailValid}
          placeholder={ text.ru.email }
          className="sign-in-form__email"
          onChange={onChangeEmail}
        />
        <Input
          type="password"
          placeholder={ text.ru.password }
          className="sign-in-form__password"
          onChange={onChangePass}
        />
        <Button value={ pagesData.signIn.title } className="sign-in-form__button" />
      </form>
      <p className="sign-in-page-additional-info">
        { text.ru.firstTimeOrForgotPassword } <Link
          className="sign-in-page-additional-info__sign-up-link"
          to="/register"
        >
          { pagesData.register.title }
        </Link>
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
