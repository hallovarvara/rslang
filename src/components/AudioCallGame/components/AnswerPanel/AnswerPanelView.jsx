import React from 'react';
import PropTypes from 'prop-types';

import Answer from '../Answer';

const AnswerPanelView = ({
  answerArray,
  question,
  handleClickAnswer,
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
          handleClickAnswer = {handleClickAnswer}
          question={question}
          answer={answer}
          key={answer.id || answer._id}
          currentAnswerId={currentAnswerId}
        />
      ));
    } return null;
  };
  return (
    <ol className="answer__container">
      {generateAnswers()}
    </ol>
  );
};

AnswerPanelView.propTypes = {
  answerArray: PropTypes.array,
  question: PropTypes.object,
  handleClickAnswer: PropTypes.func,
  isRightAnswer: PropTypes.bool,
  isFalseAnswer: PropTypes.bool,
  currentAnswerId: PropTypes.string,
};

export default AnswerPanelView;
