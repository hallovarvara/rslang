import React from 'react';
import { Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import style from './HeaderView.module.scss';

const HeaderView = () => (
  <header className={style.header}>
    <IconButton aria-label="close">
      <Close />
    </IconButton>
  </header>
);

export default HeaderView;
