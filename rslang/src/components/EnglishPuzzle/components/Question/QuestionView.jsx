import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { playAudio } from '../../helpers';
import { pauseAudio } from '../../../../helpers/functions';
import { replaceAudioSrc } from '../../helpers';

const QuestionView = ({
  question, isTranslation, isAudio, isAutoPlay,
}) => {
  const {
    textExampleTranslate,
    audioExample,
  } = question;
  const audioSrc = replaceAudioSrc(audioExample);
  const questionStyle = classNames('question__text', { disabled: !isTranslation });
  const audioButtonStyle = classNames({ disabled: !isAudio });
  let isClick = true;
  // playAudio(audioSrc, isAutoPlay, isClick);
  if (isAutoPlay) {
    isClick = false;
    const audioElement = new Audio(audioSrc);
    audioElement.play();
    audioElement.onended = () => {
      isClick = true;
      return isClick;
    };
    // pauseAudio(audioSrc);
    // playAudio(audioSrc);
  }
  const handleAudioClick = () => {
    // isClick = playAudio(audioSrc, isAudio, isClick);
    if (isAudio) {
      isClick = false;
      const audioElement = new Audio(audioSrc);
      audioElement.play();
      audioElement.onended = () => {
        isClick = true;
        return isClick;
      };
    }
  };
  return (
    <div className="question__container">
      <IconButton aria-label="audio" onClick={() => (isClick ? handleAudioClick() : '') } className={audioButtonStyle}>
        <VolumeUpRounded className={audioButtonStyle} fontSize="large"/>
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
