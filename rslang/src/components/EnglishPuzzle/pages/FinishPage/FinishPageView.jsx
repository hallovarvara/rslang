import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { buttonTextContent } from '../../constants';
import style from './FinishPageView.module.scss';

const FinishPageView = ({ handleClickNewGame, errorCount }) => {
  const { newGame } = buttonTextContent;
  return (
    <div className={style.container}>
      <div className={style.title}>Я не знаю:
        <span className={style.wrong}>{errorCount }</span>
      фраз</div>
      <Button variant="contained" size="large" onClick={() => handleClickNewGame()}>{newGame}</Button>
    </div>
  );
};

FinishPageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorCount: PropTypes.number,
};

export default FinishPageView;
