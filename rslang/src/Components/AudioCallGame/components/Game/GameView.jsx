import React from 'react';
import PropTypes from 'prop-types';
import style from './GameView.module.scss';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';
import FinishGame from '../FinishGame';

const GameView = ({
  dataWords,
  questionsList,
  level,
  numberLevel,
  answerArray,
  isRightAnswer,
  handlerClickButton,
  errorAnswerArray,
  rightAnswerArray,
  // changeLevel,
  // countError,
  isFalseAnswer,
  error,
  handlerClickAnswer,
  currentAnswerId,
  isClickable,
}) => {
  const question = questionsList[level];
  const content = question && answerArray
    ? (
      <div className={style.container}>
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
          numberLevel={numberLevel}
          handlerClickAnswer = {handlerClickAnswer}
          isRightAnswer={isRightAnswer}
          isFalseAnswer={isFalseAnswer}
          currentAnswerId={currentAnswerId}
          isClickable={isClickable}
        />
        <Button
          isRightAnswer={isRightAnswer}
          handlerClickButton={handlerClickButton}
          // changeLevel={changeLevel}
          // countError={countError}
          isFalseAnswer={isFalseAnswer}
          error={error}
        />
      </div>
    )
    : <FinishGame
        rightAnswerArray={rightAnswerArray}
        errorAnswerArray={errorAnswerArray}
      />;

  return (
    <>
      {content}
    </>
  );
};

GameView.propTypes = {
  questionsList: PropTypes.array,
  answerArray: PropTypes.array,
  dataWords: PropTypes.array,
  level: PropTypes.number,
  numberLevel: PropTypes.number,
  isRightAnswer: PropTypes.bool,
  isClickable: PropTypes.bool,
  changeLevel: PropTypes.func,
  countError: PropTypes.func,
  handlerClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
  error: PropTypes.number,
  handlerClickAnswer: PropTypes.func,
  currentAnswerId: PropTypes.string,
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default GameView;
