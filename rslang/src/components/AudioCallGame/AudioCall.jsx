import React from 'react';
import PropTypes from 'prop-types';
import GamePage from './components/GamePage';
import StartGamePage from './components/StartGamePage';
import './style.scss';

const AudioCallView = ({
  handleChooseLevel,
  setNumberLevel,
  setNumberAnswers,
  handleSubmitForm,
  level, // TODO for API
  numberAnswers,
  isStart,
  numberLevel,
  numberPage,
  getLevel,
  getPage,
  handleClickNewGame,
}) => (
  <div className="audiocall-container">
    {(!isStart)
      ? <StartGamePage
      getLevel={getLevel}
      getPage={getPage}
      numberPage={numberPage}
      numberLevel={numberLevel}
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
    />}
  </div>
);

AudioCallView.propTypes = {
  handleChooseLevel: PropTypes.func,
  setNumberLevel: PropTypes.func,
  setNumberAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  level: PropTypes.number,
  numberAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getLevel: PropTypes.func,
  getPage: PropTypes.func,
};

export default AudioCallView;
