import React from 'react';
import PropTypes from 'prop-types';
import '../../style.scss';

const ButtonView = ({
  isRightAnswer,
  changeLevel,
  countError,
  isFalseAnswer,
  error,
}) => {
  const buttonTextContent = isRightAnswer ? 'Далее' : 'Я не знаю';
  const handleClickButton = (e) => {
    e.preventDefault();
    changeLevel();
    if (!isRightAnswer) {
      countError();
    }
    console.log('По ссылке кликнули.');
  };
  return (
    <button className='button' onClick={handleClickButton}>{buttonTextContent}</button>
  );
};

ButtonView.propTypes = {
  isRightAnswer: PropTypes.bool,
  changeLevel: PropTypes.func,
  countError: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
  error: PropTypes.number,
};

export default ButtonView;
