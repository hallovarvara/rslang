import React from 'react';
import PropTypes from 'prop-types';
import style from './GameView.module.scss';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';
import FinishGame from '../FinishGame';

const GameView = ({
  questionsList,
  level,
  answerArray,
  isRightAnswer,
  handlerClickButton,
  errorAnswerArray,
  rightAnswerArray,
  isFalseAnswer,
  handlerClickAnswer,
  currentAnswerId,
}) => {
  const question = questionsList[level];
  const content = question && answerArray
    ? (
      <div className={style.container}>
        <Question
          question = {question}
          isFalseAnswer = {isFalseAnswer}
          isRightAnswer= {isRightAnswer}
        />
        <AnswerPanel
          answerArray={answerArray}
          question={question}
          handlerClickAnswer = {handlerClickAnswer}
          isRightAnswer={isRightAnswer}
          isFalseAnswer={isFalseAnswer}
          currentAnswerId={currentAnswerId}
        />
        <Button
          isRightAnswer={isRightAnswer}
          handlerClickButton={handlerClickButton}
          isFalseAnswer={isFalseAnswer}
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
  level: PropTypes.number,
  isRightAnswer: PropTypes.bool,
  changeLevel: PropTypes.func,
  countError: PropTypes.func,
  handlerClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
  handlerClickAnswer: PropTypes.func,
  currentAnswerId: PropTypes.string,
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default GameView;
