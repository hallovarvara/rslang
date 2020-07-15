import React from 'react';
import PropTypes from 'prop-types';
import GamePage from '../GamePage';
import StartGamePage from '../StartGamePage';

const MainView = ({
  handleChooseLevel,
  setNumberLevel,
  setcountAnswers,
  handleSubmitForm,
  level, // TODO for API
  countAnswers,
  isStart,
  numberLevel,
  handleClickNewGame,
}) => (
  (!isStart)
    ? <StartGamePage
      handleChooseLevel={handleChooseLevel}
      setNumberLevel={setNumberLevel}
      setcountAnswers={setcountAnswers}
      handleSubmitForm={handleSubmitForm}
    />
    : <GamePage
      level={level}
      handleClickNewGame={handleClickNewGame}
      countAnswers={countAnswers}
      isStart={isStart}
      numberLevel={numberLevel}
    />
);

MainView.propTypes = {
  handleChooseLevel: PropTypes.func,
  setNumberLevel: PropTypes.func,
  setcountAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  level: PropTypes.number,
  countAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
};

export default MainView;
