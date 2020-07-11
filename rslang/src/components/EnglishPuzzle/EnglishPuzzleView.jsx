import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';

const EnglishPuzzleView = ({
  isStart,
  handleClickButtonStart,
  handleClickNewGame,
}) => (
  <div className="container">
    {(!isStart)
      ? <StartPage
          handleClickButtonStart={handleClickButtonStart}
        />
      : <GamePage
          handleClickNewGame={handleClickNewGame}
        />}
  </div>
);

EnglishPuzzleView.propTypes = {
  isStart: PropTypes.bool,
  handleClickButtonStart: PropTypes.func,
  handleClickNewGame: PropTypes.func,
};

export default EnglishPuzzleView;
