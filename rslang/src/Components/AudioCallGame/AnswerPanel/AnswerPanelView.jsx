import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

import Answer from '../Answer';

const AnswerPanelView = ({
  answerArray,
  question,
}) => {
  const generateAnswers = () => {
    if (question.length !== 0) {
      return answerArray.map((answer) => (
        <Answer
          answer={answer}
          key={answer.id}
        />
      ));
    } return '';
  };
  return (
    <ol className="answer__container">
      {generateAnswers()}
    </ol>
  );
};

AnswerPanelView.propTypes = {
  answerArray: PropTypes.array,
  question: PropTypes.array,
};

export default AnswerPanelView;
