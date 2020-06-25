import React from 'react';
import PropTypes from 'prop-types';
import '../../style.scss';

import Answer from '../Answer';

const AnswerPanelView = ({
  answerArray,
  question,
  level,
}) => {
  const generateAnswers = () => {
    if (question.length !== 0 && question.length !== (level)) {
      return answerArray.map((answer) => (
        <Answer
          answer={answer}
          key={answer.id}
        />
      ));
    } return console.log('end');
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
  level: PropTypes.number,
};

export default AnswerPanelView;
