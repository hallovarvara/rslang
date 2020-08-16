import React from 'react';
import PropTypes from 'prop-types';
import GamePage from './components/GamePage';
import StartGamePage from './components/StartGamePage';
import './style.scss';

const AudioCallView = ({
  handleChooseLevel,
  getCountAnswers,
  getCountQuestions,
  handleSubmitForm,
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
      getCountAnswers={getCountAnswers}
      getCountQuestions={getCountQuestions}
      numberPage={numberPage}
      numberLevel={numberLevel}
      handleChooseLevel={handleChooseLevel}
      countAnswers={countAnswers}
      countQuestions={countQuestions}
      handleSubmitForm={handleSubmitForm}
    />
      : <GamePage
      data={data}
      handleClickNewGame={handleClickNewGame}
      countAnswers={countAnswers}
      isStart={isStart}
      countQuestions={countQuestions}
    />}
  </div>
);

AudioCallView.propTypes = {
  handleChooseLevel: PropTypes.func,
  getCountQuestions: PropTypes.func,
  getCountAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  level: PropTypes.number,
  countAnswers: PropTypes.number,
  isStart: PropTypes.bool,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getLevel: PropTypes.func,
  getPage: PropTypes.func,
  data: PropTypes.array,
  countQuestions: PropTypes.number,
};

export default AudioCallView;
