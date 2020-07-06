import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import {
  Spellcheck, Translate, VolumeUp, Image,
} from '@material-ui/icons';
import style from './GameHelpersView.module.scss';

const GameHelpersView = ({
  handleClickButtonTranslation,
  handleClickButtonAudio,
  handleClickButtonAutoPlay,
  isAudio,
  isTranslation,
  isAutoPlay,
}) => {
  const buttonClasses = (isClick) => classNames({ [style.disabled]: !isClick });
  return (
    <div className={style.container}>
      <Button
        variant="contained"
        color="primary"
        title="Автовоспроизведение"
        onClick={() => handleClickButtonAutoPlay()}
        className={buttonClasses(isAutoPlay)}
      >
        <Spellcheck />
      </Button>

      <Button
        variant="contained"
        color="primary"
        title="Перевод"
        onClick={() => handleClickButtonTranslation()}
        className={buttonClasses(isTranslation)}
      >
        <Translate />
      </Button>

      <Button
        variant="contained"
        color="primary"
        title="воспроизведение"
        onClick={() => handleClickButtonAudio()}
        className={buttonClasses(isAudio)}
      >
        <VolumeUp />
      </Button>

      <Button
        variant="contained"
        color="primary"
        title="Фоновое изображение"
      >
        <Image />
      </Button>
    </div>
  );
};

GameHelpersView.propTypes = {
  handleClickButtonTranslation: PropTypes.func,
  handleClickButtonAudio: PropTypes.func,
  handleClickButtonAutoPlay: PropTypes.func,
  isAudio: PropTypes.bool,
  isTranslation: PropTypes.bool,
  isAutoPlay: PropTypes.bool,
};

export default GameHelpersView;
