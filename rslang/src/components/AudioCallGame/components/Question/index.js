import React from 'react';
import PropTypes from 'prop-types';
import { replaceAudioSrc, replaceImageSrc } from '../../helpers';
import QuestionView from './QuestionView.jsx';

const Question = (props) => {
  const {
    question, isFalseAnswer, isRightAnswer,
  } = props;
  if (!question) return null;
  const {
    image,
    id,
    word,
    audio,
  } = question;

  const audioElement = new Audio(replaceAudioSrc(audio));
  audioElement.oncanplay = () => {
    if (!isFalseAnswer && !isRightAnswer) {
      audioElement.play();
    }
  };
  const srcImage = replaceImageSrc(image);

  return (
    <QuestionView
      id={id}
      word={word}
      audioElement={audioElement}
      srcImage={srcImage}
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
