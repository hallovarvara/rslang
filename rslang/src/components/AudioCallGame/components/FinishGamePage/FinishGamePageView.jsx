import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { textContent, buttonTextContent } from '../../../../helpers/constants';
import style from './FinishGamePageView.module.scss';
import FinishGameItem from '../FinishGameItem';

const FinishGamePageView = ({ errorAnswerArray, rightAnswerArray, handleClickNewGame }) => {
  const { correct, error } = textContent;
  const { newGame } = buttonTextContent;
  const generateItemsWords = (array) => (
    array.length !== 0 && array.map((word) => (
      <FinishGameItem
        key={word.id}
        word={word}
      />
    ))
  );
  return (
    <>
      <div className={style.container}>
        <div>
          <h2 className={style.title}>
            {correct}
            <span className={style.right}>{rightAnswerArray.length}</span>
          </h2>
          {generateItemsWords(rightAnswerArray)}
        </div>
        <div>
          <h2 className={style.title}>
          {error}
            <span className={style.wrong}>{errorAnswerArray.length}</span>
          </h2>
          {generateItemsWords(errorAnswerArray)}
        </div>
      </div>
      <Button variant="contained" size="large" onClick={() => handleClickNewGame()} className={style.button}>{newGame}</Button>
    </>
  );
};

FinishGamePageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default FinishGamePageView;
