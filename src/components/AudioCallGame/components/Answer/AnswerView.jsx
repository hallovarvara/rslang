import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AnswerView = ({
  answer,
  handleClickAnswer,
  question,
  currentAnswerId,
  isRightAnswer,
  isFalseAnswer,
}) => {
  const answerItem = classNames(
    'item',
    {
      right: ((isRightAnswer || isFalseAnswer)
      && (answer.id || answer._id) === (question.id || question._id)),
    },
    { wrong: isFalseAnswer && (answer.id || answer._id) === currentAnswerId },
    { disable: isRightAnswer || isFalseAnswer },
  );
  return (
  <li className={answerItem}
    key={answer.id || answer._id}
    onClick = {() => handleClickAnswer(answer.id || answer._id)}
  >{answer.wordTranslate}</li>
  );
};

AnswerView.propTypes = {
  answer: PropTypes.object,
  handleClickAnswer: PropTypes.func,
  question: PropTypes.object,
  isRightAnswer: PropTypes.bool,
  isFalseAnswer: PropTypes.bool,
  currentAnswerId: PropTypes.string,
};

export default AnswerView;
