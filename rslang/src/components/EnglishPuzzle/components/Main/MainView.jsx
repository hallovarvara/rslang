import React from 'react';
import PropTypes from 'prop-types';
import StartPage from '../../pages/StartPage';
import GamePage from '../../pages/GamePage';

const MainView = ({
  isStart,
  handleClickButtonStart,
  handleClickNewGame,
}) => (
  (!isStart)
    ? <StartPage
        handleClickButtonStart={handleClickButtonStart}
      />
    : <GamePage 
    handleClickNewGame={handleClickNewGame}
    />
);

MainView.propTypes = {
  isStart: PropTypes.bool,
  handleClickButtonStart: PropTypes.func,
  handleClickNewGame: PropTypes.func,
};

export default MainView;
