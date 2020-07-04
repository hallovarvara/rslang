import React from 'react';
import PropTypes from 'prop-types';
import style from './QuestionView.module.scss';

const QuestionView = ({ question }) => {
  const {
    textExampleTranslate,
  } = question;
  return (
    <div className={style.container}>
      <p className={style.question}>{textExampleTranslate}</p>
    </div>
  );
};

QuestionView.propTypes = {
  question: PropTypes.object,
};

export default QuestionView;
