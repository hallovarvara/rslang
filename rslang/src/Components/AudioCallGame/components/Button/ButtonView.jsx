import React from 'react';
import PropTypes from 'prop-types';
import '../../style.scss';

const ButtonView = ({
  isRightAnswer,
  handlerClickButton,
  isFalseAnswer,
}) => {
  const buttonTextContent = (isRightAnswer || isFalseAnswer) ? 'Далее' : 'Я не знаю';
  return (
    <button className='button' onClick={handlerClickButton}>{buttonTextContent}</button>
  );
};

ButtonView.propTypes = {
  isRightAnswer: PropTypes.bool,
  handlerClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
};

export default ButtonView;
