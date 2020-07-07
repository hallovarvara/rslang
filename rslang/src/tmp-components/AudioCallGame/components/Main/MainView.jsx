import React from 'react';
import PropTypes from 'prop-types';
import GamePage from '../GamePage';
import StartGamePage from '../StartGamePage';

const MainView = ({
  handleChooseLevel,
  setNumberLevel,
  setNumberAnswers,
  handleSubmitForm,
  level, // TODO for API
  numberAnswers,
  isStart,
  numberLevel,
  handleClickNewGame,
}) => (
  (!isStart)
    ? <StartGamePage
      handleChooseLevel={handleChooseLevel}
      setNumberLevel={setNumberLevel}
      setNumberAnswers={setNumberAnswers}
      handleSubmitForm={handleSubmitForm}
    />
    : <GamePage
      level={level}
      handleClickNewGame={handleClickNewGame}
      numberAnswers={numberAnswers}
      isStart={isStart}
      numberLevel={numberLevel}
    />
);

MainView.propTypes = {
  handleChooseLevel: PropTypes.func,
  setNumberLevel: PropTypes.func,
  setNumberAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  level: PropTypes.number,
  numberAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
};

export default MainView;
