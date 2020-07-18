import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { text } from '../../../../helpers/constants';
import FinishGameItem from '../FinishGameItem';

const StatisticPageView = ({ 
  statistic,
  handleShowStatistic,
  handleClickNewGame,
}) => {
  const generateItemsWords = (array) => (
    array.length !== 0 && array.map((word) => (
      <FinishGameItem
        key={word.id}
        word={word}
      />
    ))
  );
  const { ru: { button: { newGame, currentResults } } } = text;
  const buttonStyle = classNames('button', 'button_big');
  return (
    <div className="statistic__container">
    {  JSON.parse(statistic).map((day, index) => {
      return (
        <div key={index} className="statistic__item">
        <h2 className="statistic__date">{day.date}</h2>
        <div className="statistic__item_result">
          <div>
            <h2 className="statistic__item_title">
              { text.ru.answersCorrect }
              <span className="right">{day.right.length}</span>
            </h2>
            {generateItemsWords(day.right)}
          </div>
          <div>
            <h2 className="statistic__item_title">
            { text.ru.answersMistaken }
              <span className="wrong">{day.error.length}</span>
            </h2>
            {generateItemsWords(day.error)}
          </div>
        </div>
      </div>
      )})
    }
    <div className="button__container">
    <Button
        className={buttonStyle}
        variant="contained"
        size="large"
        onClick={() => handleClickNewGame()}
      >
        {newGame}
      </Button>
      <Button
        className={buttonStyle}
        variant="contained"
        size="large"
        onClick={() => handleShowStatistic()}
      >
        {currentResults}
      </Button>
    </div>
    </div>
  );  
}

StatisticPageView.propTypes = {
  statistic: PropTypes.string,
  handleShowStatistic: PropTypes.func,
  handleClickNewGame: PropTypes.func,
}

export default StatisticPageView;