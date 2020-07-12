import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { text } from '../../../../helpers/constants';
import style from './ButtonPanelView.module.scss';

const ButtonPanelView = ({
  isContinue,
  handleClickButtonContinue,
  handleClickButtonDontKnow,
  handleClickCheck,
  isShow,
}) => {
  const { ru: { button: { next, dontKnow, check } } } = text;
  return (
    <div className={style.container}>
      {
      isContinue
        ? <Button
            className={style.button}
            variant="contained"
            onClick={() => handleClickButtonContinue()}
          >
            {next}
          </Button>
        : <Button
            className={style.button}
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
            className={style.button}
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
