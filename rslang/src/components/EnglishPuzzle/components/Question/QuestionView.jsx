import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
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
  const playAudio = (audio, isShow) => {
    if (isShow) {
      isClick = false;
      const audioElement = new Audio(audio);
      audioElement.play();
      audioElement.onended = () => {
        isClick = true;
      };
    }
  };
  playAudio(audioSrc, isAutoPlay);
  return (
    <div className="question__container">
      <IconButton aria-label="audio" onClick={() => (isClick ? playAudio(audioSrc, isAudio) : '') } className={audioButtonStyle}>
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
