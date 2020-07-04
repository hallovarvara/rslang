import React from 'react';
import PropTypes from 'prop-types';
import style from './GamePageView.module.scss';
import Question from '../../components/Question';
import PhraseElements from '../../components/PhraseElements';

const GamePageView = ({
  questionList,
  level,
  phrasesArray,
}) => {
  const question = questionList[level];
  const phrase = phrasesArray[level];
  return (
    question && phrase
      ? (<div className="container">
      <Question
        question={question}
      />
      <PhraseElements
        phrase={phrase}
      />
    </div>)
      : <p>ybxtuj</p>
  );
};

GamePageView.propTypes = {
  questionList: PropTypes.array,
  level: PropTypes.number,
  phrasesArray: PropTypes.array,
};

export default GamePageView;
