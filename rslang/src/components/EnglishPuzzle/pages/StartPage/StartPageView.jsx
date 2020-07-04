import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { buttonTextContent } from '../../constants';
import style from './StartPageView.module.scss';

const StartPageView = ({ handleClickButtonStart }) => (
  <div className={style.container}>
    <h2 className={style.title}>конструктор фраз</h2>
    <p className={style.text}>
      Кликайте на слова, собирайте предложения. Слова можно перетаскивать.
    </p>
    <Button variant="contained" onClick={handleClickButtonStart}>{buttonTextContent.startGame}</Button>
  </div>
);

StartPageView.propTypes = {
  handleClickButtonStart: PropTypes.func,
};

export default StartPageView;
