import React from 'react';
import PropTypes from 'prop-types';
import { VolumeUpRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import style from './FinishGameItemView.module.scss';
import { replaceAudioSrc } from '../../helpers';

const FinishGameItemView = ({ word }) => {
  const audioElement = new Audio(replaceAudioSrc(word.audio));
  return (
    <div className={style.container}>
      <IconButton aria-label="audio" onClick={() => (audioElement.play())}>
        <VolumeUpRounded fontSize="large"/>
      </IconButton>
      <p className={style.text}>{word.word}</p>
    </div>
  );
};

FinishGameItemView.propTypes = {
  word: PropTypes.object,
};

export default FinishGameItemView;
