import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { buttonTextContent } from '../../constants';
import style from './GamePageView.module.scss';
import Question from '../../components/Question';
import PhraseElements from '../../components/PhraseElements';
import GameHelpers from '../../components/GameHelpers';

const GamePageView = ({
  questionList,
  level,
  phrasesArray,
  isTranslation,
  isAudio,
  isAutoPlay,
  handleClickButtonTranslation,
  handleClickButtonAudio,
  handleClickButtonAutoPlay,
  handleClickButtonDontKnow,
  handleClickButtonContinue,
  handleClickCheck,
  isCheck,
  isContinue,
  puzzleItems,
  answerItems,
  errorCount,
  prevPhraseArray,
}) => {
  const question = questionList[level];
  const phrase = phrasesArray[level];
  return (
    question && phrase
      ? (<div className="container">
      <GameHelpers
        handleClickButtonTranslation={handleClickButtonTranslation}
        handleClickButtonAudio={handleClickButtonAudio}
        handleClickButtonAutoPlay={handleClickButtonAutoPlay}
        isAudio={isAudio}
        isTranslation={isTranslation}
        isAutoPlay={isAutoPlay}
      />
      <Question
        isAudio={isAudio}
        isTranslation={isTranslation}
        isAutoPlay={isAutoPlay}
        question={question}
      />
      <div className={style.table}>
        {(prevPhraseArray.length !== 0)
          ? (prevPhraseArray.map((prevPharase, index) => (
            <div key={index} className={style.container}>
            {prevPharase.map((word, number) => (
              <div className={style.item} key={number}>{word}</div>
            )) }
            </div>
          )))
          : ''
        }
        <PhraseElements
          errorCount={errorCount}
          answerItems={answerItems}
          phrase={phrase}
          puzzleItems={puzzleItems}
          level={level}
          phrasesArray={phrasesArray}
          handleClickCheck={handleClickCheck}
          isCheck={isCheck}
        />
      </div>
      {
      isContinue
        ? <Button
          errorCount={errorCount}
          isContinue={isContinue}
          onClick={handleClickButtonContinue}
        >{buttonTextContent.next}</Button>
        : <Button
          errorCount={errorCount}
          isContinue={isContinue}
          onClick={handleClickButtonDontKnow}
        >{buttonTextContent.dontKnow}</Button>
      }
    </div>)
      : <p>ybxtuj</p>
  );
};

GamePageView.propTypes = {
  questionList: PropTypes.array,
  level: PropTypes.number,
  phrasesArray: PropTypes.array,
  isTranslation: PropTypes.bool,
  isAudio: PropTypes.bool,
  isAutoPlay: PropTypes.bool,
  handleClickButtonTranslation: PropTypes.func,
  handleClickButtonAudio: PropTypes.func,
  handleClickButtonAutoPlay: PropTypes.func,
  handleClickButtonDontKnow: PropTypes.func,
  handleClickButtonContinue: PropTypes.func,
  isContinue: PropTypes.bool,
  puzzleItems: PropTypes.array,
  answerItems: PropTypes.bool,
  errorCount: PropTypes.number,
  prevPhraseArray: PropTypes.array,
};

export default GamePageView;
