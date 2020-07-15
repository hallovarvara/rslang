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
}) => {
  const { ru: { button: { newGame }, answersMistaken } } = text;
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
      <Button
        className={buttonStyle}
        variant="contained"
        size="large"
        onClick={() => handleClickNewGame()}
      >
        {newGame}
      </Button>
    </div>
  );
};

FinishPageView.propTypes = {
  handleClickNewGame: PropTypes.func,
  errorCount: PropTypes.number,
  paintingInfo: PropTypes.object,
  isBackground: PropTypes.bool,
  backgroundUrl: PropTypes.string,
};

export default FinishPageView;
