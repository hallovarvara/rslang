import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from '@material-ui/core';
// import { buttonTextContent } from '../../constants';
import style from './GamePageView.module.scss';
import Question from '../../components/Question';
import PhraseElements from '../../components/PhraseElements';
import GameHelpers from '../../components/GameHelpers';
import ButtonPanel from '../../components/ButtonPanel';
import FinishPage from '../FinishPage';

const GamePageView = ({
  handleClickNewGame,
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
  updateIsShow,
  updateIsCheck,
  handleClickCheck,
  isCheck,
  isContinue,
  puzzleItems,
  answerItems,
  errorCount,
  isEnd,
  prevPhraseArray,
  isShow,
}) => {
  const question = questionList[level];
  const phrase = phrasesArray[level];
  const getItemStyle = (item, wordArray) => (
    { width: `${(800 * item) / wordArray.join('').length}px` }
  );

  return (
    question && phrase && !isEnd
      ? (<div>
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
              <div
                style={getItemStyle(word.length, prevPharase)}
                className={style.item}
                key={number}
              >
                {word}
              </div>
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
          updateIsCheck={updateIsCheck}
          isCheck={isCheck}
          updateIsShow={updateIsShow}
        />
      </div>
      <ButtonPanel
        isContinue={isContinue}
        handleClickButtonContinue={handleClickButtonContinue}
        handleClickButtonDontKnow={handleClickButtonDontKnow}
        isShow={isShow}
        handleClickCheck={handleClickCheck}
      />
    </div>)
      : <FinishPage
          handleClickNewGame={handleClickNewGame}
          errorCount={errorCount}
        />
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
  answerItems: PropTypes.array,
  errorCount: PropTypes.number,
  prevPhraseArray: PropTypes.array,
  isShow: PropTypes.bool,
  updateIsShow: PropTypes.func,
  updateIsCheck: PropTypes.func,
  handleClickCheck: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  isCheck: PropTypes.bool,
  isEnd: PropTypes.bool,
};

export default GamePageView;
