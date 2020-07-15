import React from 'react';
import PropTypes from 'prop-types';
import GamePage from './components/GamePage';
import StartGamePage from './components/StartGamePage';
import './style.scss';

const AudioCallView = ({
  handleChooseLevel,
  setNumberLevel,
  setcountAnswers,
  handleSubmitForm,
  // level, // TODO for API
  countAnswers,
  isStart,
  numberLevel,
  numberPage,
  getLevel,
  getPage,
  handleClickNewGame,
  data,
  countQuestions,
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
      setcountAnswers={setcountAnswers}
      handleSubmitForm={handleSubmitForm}
    />
      : <GamePage
      data={data}
      // level={level}
      handleClickNewGame={handleClickNewGame}
      countAnswers={countAnswers}
      isStart={isStart}
      countQuestions={countQuestions}
    />}
  </div>
);

AudioCallView.propTypes = {
  handleChooseLevel: PropTypes.func,
  setNumberLevel: PropTypes.func,
  setcountAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  level: PropTypes.number,
  countAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getLevel: PropTypes.func,
  getPage: PropTypes.func,
};

export default AudioCallView;
