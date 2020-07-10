import React from 'react';
import PropTypes from 'prop-types';
import { getMediaPath } from '../../../../helpers/functions';
import QuestionView from './QuestionView.jsx';

const Question = (props) => {
  const {
    question, isFalseAnswer, isRightAnswer,
  } = props;
  const {
    image,
    id,
    word,
    audio,
  } = question;

  const audioElement = new Audio(getMediaPath(audio));

  audioElement.oncanplay = () => {
    if (!isFalseAnswer && !isRightAnswer) {
      audioElement.play();
    }
  };

  return (
    <QuestionView
      id={id}
      word={word}
      audioElement={audioElement}
      srcImage={getMediaPath(image)}
      isFalseAnswer={isFalseAnswer}
      isRightAnswer={isRightAnswer}
    />
  );
};

Question.propTypes = {
  question: PropTypes.object,
  level: PropTypes.number,
  isFalseAnswer: PropTypes.bool,
  isRightAnswer: PropTypes.bool,
};

export default Question;
