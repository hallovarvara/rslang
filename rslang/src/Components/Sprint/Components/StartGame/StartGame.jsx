import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './StartGame.scss';

const StartGame = () => (
  <div className={'sprint-start__container'}>
    <div className={'sprint-start__'}></div>
    <div className={'sprint-start__'}></div>
    <Button
      variant="contained"
      color="secondary"
      className={'Button'}
      size={'large'}
      startIcon={<PlayArrowIcon />}
    >
      START
  </Button>
  </div>

);

export default StartGame;
