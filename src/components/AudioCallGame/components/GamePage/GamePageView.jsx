import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';
import FinishGamePage from '../FinishGamePage';
import StatisticPage from '../StatisticPage';

const GamePageView = ({
  questionsList,
  level,
  answerArray,
  isRightAnswer,
  handleClickButton,
  errorAnswerArray,
  rightAnswerArray,
  isFalseAnswer,
  handleClickNewGame,
  handleClickAnswer,
  currentAnswerId,
  statistic,
  isStatisticShow,
  handleShowStatistic,
}) => {
  const question = questionsList[level];
  return (
    question && answerArray
      ? (
      <div className="game-page__container">
        <Question
          question = {question}
          isFalseAnswer = {isFalseAnswer}
          isRightAnswer= {isRightAnswer}
        />
        <AnswerPanel
          answerArray={answerArray}
          question={question}
          handleClickAnswer = {handleClickAnswer}
          isRightAnswer={isRightAnswer}
          isFalseAnswer={isFalseAnswer}
          currentAnswerId={currentAnswerId}
        />
        <Button
          isRightAnswer={isRightAnswer}
          handleClickButton={handleClickButton}
          isFalseAnswer={isFalseAnswer}
        />
      </div>
      )
      : (isStatisticShow 
        ? <StatisticPage 
          handleClickNewGame={handleClickNewGame}
          rightAnswerArray={rightAnswerArray}
          errorAnswerArray={errorAnswerArray}
          handleShowStatistic={handleShowStatistic}
          statistic={statistic}
          />         
        : <FinishGamePage
          handleClickNewGame={handleClickNewGame}
          rightAnswerArray={rightAnswerArray}
          errorAnswerArray={errorAnswerArray}
          handleShowStatistic={handleShowStatistic}
        />
      )
  );
};

GamePageView.propTypes = {
  questionsList: PropTypes.array,
  answerArray: PropTypes.array,
  level: PropTypes.number,
  isRightAnswer: PropTypes.bool,
  changeLevel: PropTypes.func,
  countError: PropTypes.func,
  handleClickButton: PropTypes.func,
  isFalseAnswer: PropTypes.bool,
  handleClickAnswer: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  currentAnswerId: PropTypes.string,
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default GamePageView;
