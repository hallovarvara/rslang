import React from 'react';
import PropTypes from 'prop-types';
import style from './FinishGamePageView.module.scss';
import FinishGameItem from '../FinishGameItem';

const FinishGamePageView = ({ errorAnswerArray, rightAnswerArray }) => {
  const generateErrorWords = () => {
    if (errorAnswerArray.length !== 0) {
      return errorAnswerArray.map((word) => (
        <FinishGameItem
          key={word.id}
          word={word}
        />
      ));
    } return null;
  };
  const generateRightWords = () => {
    if (errorAnswerArray.length !== 0) {
      return rightAnswerArray.map((word) => (
        <FinishGameItem
          key={word.id}
          word={word}
        />
      ));
    } return null;
  };
  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>
          {'Знаю '}
          <span className={style.right}>{rightAnswerArray.length}</span>
        </h2>
        {generateRightWords()}
      </div>
      <div>
        <h2 className={style.title}>
         {'Не знаю '}
          <span className={style.wrong}>{errorAnswerArray.length}</span>
        </h2>
        {generateErrorWords()}
      </div>
    </div>
  );
};

FinishGamePageView.propTypes = {
  errorAnswerArray: PropTypes.array,
  rightAnswerArray: PropTypes.array,
};

export default FinishGamePageView;
