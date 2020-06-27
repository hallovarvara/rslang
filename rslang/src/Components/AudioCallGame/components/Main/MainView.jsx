import React from 'react';
import PropTypes from 'prop-types';
import Game from '../Game';
import StartGame from '../StartGame';

const MainView = ({
  handleChooseLevel,
  setNumberLevel,
  setNumberAnswers,
  handleSubmitForm,
  level, // TODO for API
  numberAnswers,
  isStart,
  numberLevel,
}) => (
  (!isStart)
    ? <StartGame
      handleChooseLevel={handleChooseLevel}
      setNumberLevel={setNumberLevel}
      setNumberAnswers={setNumberAnswers}
      handleSubmitForm={handleSubmitForm}
    />
    : <Game
      level={level}
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
  level: PropTypes.number,
  numberAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
};

export default MainView;
