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
  console.log(statistic, 9999)
  const { ru: { button: { newGame, currentResults } } } = text;
  const buttonStyle = classNames('button', 'button_big');
  return (
    <>
    {  JSON.parse(statistic).map((day, index) => {
      return (
        <div key={index}>
          <h3>{day.data}</h3>
          <p>{day.error}</p>
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
    </>
  );  
}

StatisticPageView.propTypes = {
  statistic: PropTypes.array,
  handleShowStatistic: PropTypes.func,
  handleClickNewGame: PropTypes.func,
}

export default StatisticPageView;