import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { text } from '../../../../helpers/constants';

const FinishPageView = ({
  handleClickNewGame,
  errorCount,
  paintingInfo,
  isBackground,
  backgroundUrl,
  handleShowStatistic,
}) => {
  const { ru: { button: { newGame, lastResults }, answersMistaken } } = text;
  const buttonStyle = classNames('button', 'button_big');
  return (
    <div className="finish-page">
      {isBackground
        ? (<>
            <p className="text">
              <span>{paintingInfo.name}, </span>
               {paintingInfo.author}, {paintingInfo.year}
            </p>
            <img src={backgroundUrl} alt="" className="picture"/>
          </>)
        : ''
      }
      <p className="title">{answersMistaken}
        <span className="wrong">{errorCount}</span>
      </p>
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
          {lastResults}
        </Button>
      </div>
    </div>
  );
};

FinishPageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorCount: PropTypes.number,
  paintingInfo: PropTypes.object,
  isBackground: PropTypes.bool,
  backgroundUrl: PropTypes.string,
  handleShowStatistic: PropTypes.func,
};

export default FinishPageView;
