import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import {
  Spellcheck,
  Translate,
  VolumeUp,
  Image,
} from '@material-ui/icons';

const GameHelpersView = ({
  handleClickButtonTranslation,
  handleClickButtonAudio,
  handleClickButtonAutoPlay,
  handleClickButtonBackground,
  isBackground,
  isAudio,
  isTranslation,
  isAutoPlay,
}) => {
  const buttonClasses = (isClick) => classNames('helper__button', { helper__button_disabled: !isClick });
  return (
    <div className='helper'>
      <Button
        variant="contained"
        color="primary"
        title="Автовоспроизведение"
        onClick={() => handleClickButtonAutoPlay()}
        className={buttonClasses(isAutoPlay)}
      >
        <Spellcheck fontSize="default"/>
      </Button>
      <Button
        variant="contained"
        color="primary"
        title="Перевод"
        onClick={() => handleClickButtonTranslation()}
        className={buttonClasses(isTranslation)}
      >
        <Translate fontSize="default"/>
      </Button>
      <Button
        variant="contained"
        color="primary"
        title="Воспроизведение"
        onClick={() => handleClickButtonAudio()}
        className={buttonClasses(isAudio)}
      >
        <VolumeUp fontSize="default"/>
      </Button>
      <Button
        variant="contained"
        color="primary"
        title="Фоновое изображение"
        onClick={() => handleClickButtonBackground()}
        className={buttonClasses(isBackground)}
      >
        <Image fontSize="default"/>
      </Button>
    </div>
  );
};

GameHelpersView.propTypes = {
  handleClickButtonTranslation: PropTypes.func,
  handleClickButtonAudio: PropTypes.func,
  handleClickButtonAutoPlay: PropTypes.func,
  handleClickButtonBackground: PropTypes.func,
  isAudio: PropTypes.bool,
  isTranslation: PropTypes.bool,
  isAutoPlay: PropTypes.bool,
  isBackground: PropTypes.bool,
};

export default GameHelpersView;
