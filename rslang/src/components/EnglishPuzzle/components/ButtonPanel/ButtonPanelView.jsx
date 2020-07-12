import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { text } from '../../../../helpers/constants';

const ButtonPanelView = ({
  isContinue,
  handleClickButtonContinue,
  handleClickButtonDontKnow,
  handleClickCheck,
  isShow,
}) => {
  const { ru: { button: { next, dontKnow, check } } } = text;
  const buttonstyle = classNames('button', 'button_small');
  return (
    <div className="button__container">
      {
      isContinue
        ? <Button
            className={buttonstyle}
            variant="contained"
            onClick={() => handleClickButtonContinue()}
          >
            {next}
          </Button>
        : <Button
            className={buttonstyle}
            variant="contained"
            isContinue={isContinue}
            onClick={() => handleClickButtonDontKnow()}
          >
            {dontKnow}
          </Button>
      }
      {
      isShow
        ? <Button
            className={buttonstyle}
            variant="contained"
            color="primary"
            onClick={() => handleClickCheck()}
          >
            {check}
          </Button>
        : ''
      }
    </div>
  );
};

ButtonPanelView.propTypes = {
  isContinue: PropTypes.bool,
  handleClickButtonContinue: PropTypes.func,
  handleClickButtonDontKnow: PropTypes.func,
  handleClickCheck: PropTypes.func,
  isShow: PropTypes.bool,
};

export default ButtonPanelView;
