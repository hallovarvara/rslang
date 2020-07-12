import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { playAudio, pauseAudio } from '../../../../helpers/functions';
import { replaceAudioSrc } from '../../helpers';
import style from './QuestionView.module.scss';

const QuestionView = ({
  question, isTranslation, isAudio, isAutoPlay,
}) => {
  const {
    textExampleTranslate,
    audioExample,
  } = question;
  const audioSrc = replaceAudioSrc(audioExample);
  const questionStyle = classNames(style.question, { [style.disabled]: !isTranslation });
  const audioButtonStyle = classNames({ [style.disabled]: !isAudio });
  if (isAutoPlay) {
    pauseAudio(audioSrc);
    playAudio(audioSrc);
  }
  const handleAudioClick = () => {
    if (isAudio) {
      playAudio(audioSrc);
    }
    pauseAudio(audioSrc);
  };
  return (
    <div className={style.container}>
      <IconButton aria-label="audio" onClick={() => handleAudioClick() } className={audioButtonStyle}>
        <VolumeUpRounded className={style.icon} fontSize="large"/>
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
