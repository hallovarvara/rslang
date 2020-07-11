import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { gamesData, buttonTextContent } from '../../../../helpers/constants';
import style from './StartPageView.module.scss';

const StartPageView = ({ handleClickButtonStart }) => {
  const { englishPuzzle: { title, description } } = gamesData;
  const { startGame } = buttonTextContent;
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.text}>{description}</p>
      <Button variant="contained" onClick={handleClickButtonStart}>{startGame}</Button>
    </div>
  );
};

StartPageView.propTypes = {
  handleClickButtonStart: PropTypes.func,
};

export default StartPageView;
