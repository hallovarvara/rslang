import React from 'react';
import { Close, MusicNote, MusicOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import style from './HeaderView.module.scss';

const musicOff = () => (console.log('click'));

const HeaderView = () => {
  return (
    <header className={style.header}>
      <IconButton aria-label="musicnote" onClick={() => musicOff()}>
        <MusicNote />
      </IconButton>
      <IconButton aria-label="close">
        <Close />
      </IconButton>
    </header>
  );
};

export default HeaderView;
