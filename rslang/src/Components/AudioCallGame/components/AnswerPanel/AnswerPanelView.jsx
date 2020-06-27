import React from 'react';
import PropTypes from 'prop-types';
import style from './AnswerPanelView.module.scss';

import Answer from '../Answer';

const AnswerPanelView = ({
  answerArray,
  question,
  handlerClickAnswer,
  isRightAnswer,
  isFalseAnswer,
  currentAnswerId,
}) => {
  const generateAnswers = () => {
    if (question && answerArray) {
      return answerArray.map((answer) => (
        <Answer
          isRightAnswer={isRightAnswer}
          isFalseAnswer={isFalseAnswer}
          handlerClickAnswer = {handlerClickAnswer}
          question={question}
          answer={answer}
          key={answer.id}
          currentAnswerId={currentAnswerId}
        />
      ));
    } return null;
  };
  return (
    <ol className={style.container}>
      {generateAnswers()}
    </ol>
  );
};

AnswerPanelView.propTypes = {
  answerArray: PropTypes.array,
  question: PropTypes.object,
  level: PropTypes.number,
  handlerClickAnswer: PropTypes.func,
  isRightAnswer: PropTypes.bool,
  isFalseAnswer: PropTypes.bool,
  currentAnswerId: PropTypes.string,
};

export default AnswerPanelView;
