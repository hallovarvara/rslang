import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { text } from '../../../../helpers/constants';

const ButtonView = ({
  isRightAnswer,
  handleClickButton,
  isFalseAnswer,
}) => {
  const buttonStyle = classNames('button', 'button_small');
  const { next, dontKnow } = text.ru.button;
  const buttonValue = (isRightAnswer || isFalseAnswer) ? next : dontKnow;
  return (
    <Button
      variant="contained"
      size="large"
      className={buttonStyle}
      onClick={handleClickButton}
    >
      { buttonValue }
    </Button>
  );
};

ButtonView.propTypes = {
  isRightAnswer: PropTypes.bool,
  handleClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
};

export default ButtonView;
