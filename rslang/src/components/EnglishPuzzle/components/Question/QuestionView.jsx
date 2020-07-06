import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { playAudio, replaceAudioSrc } from '../../helpers';
import style from './QuestionView.module.scss';

const QuestionView = ({
  question, isTranslation, isAudio, isAutoPlay,
}) => {
  const {
    textExampleTranslate,
    audioExample,
  } = question;
  const questionStyle = classNames(style.question, { [style.disabled]: !isTranslation });
  const audioButtonStyle = classNames({ [style.disabled]: !isAudio });
  const audioElement = new Audio(replaceAudioSrc(audioExample));
  if (isAutoPlay) {
    audioElement.oncanplay = () => {
      audioElement.play();
    };
  }
  return (
    <div className={style.container}>
      <IconButton aria-label="audio" onClick={() => playAudio(audioExample, isAudio)} className={audioButtonStyle}>
        <VolumeUpRounded fontSize="large" />
      </IconButton>
      <div className={questionStyle}>{textExampleTranslate}</div>
    </div>
  );
};

QuestionView.propTypes = {
  isTranslation: PropTypes.bool,
  isAudio: PropTypes.bool,
  isAutoPlay: PropTypes.bool,
  question: PropTypes.object,
};

export default QuestionView;
