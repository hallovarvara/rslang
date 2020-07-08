import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { buttonTextContent } from '../../constants';
import style from './ButtonPanelView.module.scss';

const ButtonPanelView = ({
  isContinue,
  // errorCount,
  handleClickButtonContinue,
  handleClickButtonDontKnow,
  handleClickCheck,
  isShow,
}) => (
  <div className={style.container}>
      {
      isContinue
        ? <Button
            className={style.button}
            variant="contained"
            // isContinue={isContinue}
            onClick={() => handleClickButtonContinue()}
          >
            {buttonTextContent.next}
          </Button>
        : <Button
            className={style.button}
            variant="contained"
            // errorCount={errorCount}
            isContinue={isContinue}
            onClick={() => handleClickButtonDontKnow()}
          >
            {buttonTextContent.dontKnow}
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
            {buttonTextContent.check}
          </Button>
        : ''
      }
    </div>
);

ButtonPanelView.propTypes = {
  isContinue: PropTypes.bool,
  // errorCount: PropTypes.number,
  handleClickButtonContinue: PropTypes.func,
  handleClickButtonDontKnow: PropTypes.func,
  handleClickCheck: PropTypes.func,
  isShow: PropTypes.bool,
};

export default ButtonPanelView;
