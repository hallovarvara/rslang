import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { text } from '../../../../helpers/constants';

const StatisticPageView = ({ 
  statistic,
  handleShowStatistic,
  handleClickNewGame,
}) => {
  const { ru: { button: { newGame, currentResults } } } = text;
  const buttonStyle = classNames('button', 'button_big');
  return (
    <div className="statistic__container">
    { JSON.parse(statistic).map((day, index) => {
      return (
        <div key={index} className="statistic__item">
          <h2 className="statistic__date">{day.date}</h2>
          <div className="statistic__item_result">
            <p className="statistic__item_text">Ошибок: <span className="wrong">{day.error}</span></p>
            <p className="statistic__item_text">Верно: <span className="right">{day.right}</span></p>
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