import React from 'react';
import PropTypes from 'prop-types';
import StartPage from '../../pages/StartPage';
import GamePage from '../../pages/GamePage';

const MainView = ({ isStart, handleClickButtonStart }) => (
  (!isStart)
    ? <StartPage
        handleClickButtonStart={handleClickButtonStart}
      />
    : <GamePage />
);

MainView.propTypes = {
  isStart: PropTypes.bool,
  handleClickButtonStart: PropTypes.func,
};

export default MainView;
