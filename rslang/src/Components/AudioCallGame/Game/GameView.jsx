import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';

const GameView = ({
  dataWords,
  question,
  level,
  numberLevel,
  answerArray,
}) => (
  <div className="game__container">
    <Question />
    <AnswerPanel
      answerArray={answerArray}
      dataWords={dataWords}
      question={question}
      level={level}
      numberLevel={numberLevel}
    />
    <Button />
  </div>
);

GameView.propTypes = {
  answerArray: PropTypes.array,
  dataWords: PropTypes.array,
  question: PropTypes.array,
  level: PropTypes.number,
  numberLevel: PropTypes.number,
};

export default GameView;
