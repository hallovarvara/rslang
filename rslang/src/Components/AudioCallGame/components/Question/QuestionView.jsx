import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { replaceImageSrc, replaceAudioSrc } from '../../helpers';
import style from './QuestionView.module.scss';

const QuestionView = ({
  isFalseAnswer,
  isRightAnswer,
  question,
  level,
}) => {
  const iconClass = classNames({ [style.volumeUpRounded]: !isFalseAnswer && !isRightAnswer });
  const setPicture = () => {
    if (question.length !== 0 && question.length !== level) {
      const {
        image,
        id,
        word,
        audio,
      } = question[level];
      const audioElement = new Audio(replaceAudioSrc(audio));
      const url = replaceImageSrc(image);
      const obj = {
        url,
        id,
        word,
        audioElement,
      };
      return obj;
    } return {};
  };
  const {
    url,
    id,
    word,
    audioElement,
  } = setPicture();
  const audioIconClickHandler = () => {
    audioElement.play();
  };
  const wordClasses = classNames(style.word, { [style.hidden]: !isFalseAnswer && !isRightAnswer });
  const pictureClasses = classNames(
    style.picture,
    { [style.hidden]: !isFalseAnswer && !isRightAnswer },
  );
  return (
    <div className={style.container} dataId= {id}>
      <img src={url} alt={word} className={pictureClasses}/>
      <div className="description">
        <IconButton aria-label="audio" className={style.iconButton} onClick = {() => audioIconClickHandler()}>
          <VolumeUpRounded fontSize="large" className={iconClass}/>
        </IconButton>
        <p className={wordClasses}>{word}</p>
      </div>
    </div>
  );
};

QuestionView.propTypes = {
  isFalseAnswer: PropTypes.bool,
  isRightAnswer: PropTypes.bool,
  question: PropTypes.array,
  level: PropTypes.number,
};

export default QuestionView;
