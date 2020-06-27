import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './AnswerView.module.scss';

const AnswerView = ({
  answer,
  handlerClickAnswer,
  question,
  currentAnswerId,
  isRightAnswer,
  isFalseAnswer,
}) => {
  const answerItem = classNames(
    style.item,
    { [style.right]: ((isRightAnswer || isFalseAnswer) && answer.id === question.id) },
    { [style.wrong]: isFalseAnswer && answer.id === currentAnswerId },
  );
  return (
  <li className={answerItem}
    key={answer.id}
    onClick = {() => handlerClickAnswer(answer.id)}
  >{answer.wordTranslate}</li>
  );
};

AnswerView.propTypes = {
  answer: PropTypes.object,
  handlerClickAnswer: PropTypes.func,
  question: PropTypes.object,
  isRightAnswer: PropTypes.bool,
  isFalseAnswer: PropTypes.bool,
  currentAnswerId: PropTypes.string,
};

export default AnswerView;
