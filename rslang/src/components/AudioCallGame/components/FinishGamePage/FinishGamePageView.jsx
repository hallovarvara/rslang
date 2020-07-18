import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

import { text } from '../../../../helpers/constants';

import FinishGameItem from '../FinishGameItem';

const FinishGamePageView = ({ errorAnswerArray, rightAnswerArray, handleClickNewGame, handleShowStatistic }) => {
  const generateItemsWords = (array) => (
    array.length !== 0 && array.map((word) => (
      <FinishGameItem
        key={word.id}
        word={word}
      />
    ))
  );
  const buttonStyle = classNames('button', 'button_small', 'button_center');
  return (
    <>
      <div className="finish-page__container">
        <div className="finish-page__result">
          <div>
            <h2 className="title">
              { text.ru.answersCorrect }
              <span className="right">{rightAnswerArray.length}</span>
            </h2>
            {generateItemsWords(rightAnswerArray)}
          </div>
          <div>
            <h2 className="title">
            { text.ru.answersMistaken }
              <span className="wrong">{errorAnswerArray.length}</span>
            </h2>
            {generateItemsWords(errorAnswerArray)}
          </div>
        </div>
        <div className="button__container">
          <Button
            variant="contained"
            size="large"
            onClick={() => handleClickNewGame()}
            className={buttonStyle}
          >
            { text.ru.button.newGame }
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleShowStatistic()}
            className={buttonStyle}
          >
            { text.ru.button.lastResults }
          </Button>
        </div>
      </div>
    </>
  );
};

FinishGamePageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default FinishGamePageView;
