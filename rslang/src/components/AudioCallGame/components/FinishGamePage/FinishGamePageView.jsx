import React from 'react';
import PropTypes from 'prop-types';
import { textContent } from '../../constants';
import style from './FinishGamePageView.module.scss';
import FinishGameItem from '../FinishGameItem';

const FinishGamePageView = ({ errorAnswerArray, rightAnswerArray }) => {
  const { correct, error } = textContent;
  const generateItemsWords = (array) => (
    array.length !== 0 && array.map((word) => (
      <FinishGameItem
        key={word.id}
        word={word}
      />
    ))
  );
  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>
          {correct}
          <span className={style.right}>{rightAnswerArray.length}</span>
        </h2>
        {generateItemsWords(rightAnswerArray)}
      </div>
      <div>
        <h2 className={style.title}>
         {error}
          <span className={style.wrong}>{errorAnswerArray.length}</span>
        </h2>
        {generateItemsWords(errorAnswerArray)}
      </div>
    </div>
  );
};

FinishGamePageView.propTypes = {
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default FinishGamePageView;
