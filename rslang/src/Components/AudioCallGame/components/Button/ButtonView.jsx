import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@material-ui/core';
import style from './ButtonView.module.scss';

const ButtonView = ({
  isRightAnswer,
  handlerClickButton,
  isFalseAnswer,
}) => {
  const buttonTextContent = (isRightAnswer || isFalseAnswer) ? 'Далее' : 'Я не знаю';
  return (
    <Button variant="contained" size="large" className={style.button} onClick={handlerClickButton}>{buttonTextContent}</Button>
  );
};

ButtonView.propTypes = {
  isRightAnswer: PropTypes.bool,
  handlerClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
};

export default ButtonView;
