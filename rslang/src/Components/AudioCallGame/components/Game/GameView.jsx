import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';

const GameView = ({
  dataWords,
  question,
  level,
  numberLevel,
  answerArray,
  isRightAnswer,
  changeLevel,
  countError,
  isFalseAnswer,
  error,
}) => (
  <div className="game__container">
    <Question
      question = {question}
      level = {level}
      isFalseAnswer = {isFalseAnswer}
      isRightAnswer= {isRightAnswer}
    />
    <AnswerPanel
      answerArray={answerArray}
      dataWords={dataWords}
      question={question}
      level={level}
      numberLevel={numberLevel}
    />
    <Button
      isRightAnswer={isRightAnswer}
      changeLevel={changeLevel}
      countError={countError}
      isFalseAnswer={isFalseAnswer}
      error={error}
    />
  </div>
);

GameView.propTypes = {
  answerArray: PropTypes.array,
  dataWords: PropTypes.array,
  question: PropTypes.array,
  level: PropTypes.number,
  numberLevel: PropTypes.number,
  isRightAnswer: PropTypes.bool,
  changeLevel: PropTypes.func,
  countError: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
  error: PropTypes.number,
};

export default GameView;
