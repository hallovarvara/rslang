import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';

const EnglishPuzzleView = ({
  isStart,
  handleClickButtonStart,
  handleClickNewGame,
  backgroundUrl,
  isBackground,
  handleClickButtonBackground,
}) => (
  <div className="container">
    {(!isStart)
      ? <StartPage
          handleClickButtonStart={handleClickButtonStart}
        />
      : <GamePage
          handleClickNewGame={handleClickNewGame}
          backgroundUrl={backgroundUrl}
          handleClickButtonBackground={handleClickButtonBackground}
          isBackground={isBackground}
        />}
  </div>
);

EnglishPuzzleView.propTypes = {
  isStart: PropTypes.bool,
  handleClickButtonStart: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  backgroundUrl: PropTypes.string,
  isBackground: PropTypes.bool,
  handleClickButtonBackground: PropTypes.func,
};

export default EnglishPuzzleView;
