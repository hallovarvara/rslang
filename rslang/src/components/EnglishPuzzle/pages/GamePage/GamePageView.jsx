import React from 'react';
import PropTypes from 'prop-types';
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
  const getItemStyle = (item, index, wordArray, rowNumber) => (
    {
      width: `${(100 * item) / wordArray.join('').length}%`,
      backgroundImage: 'url(https://github.com/KseniyaYatskevich/rslang_data_paintings/blob/master/level1/cut/9th_wave.jpg?raw=true)',
      backgroundPosition: `-${(800 * wordArray.slice(0, index).join('').length) / wordArray.join('').length}px -${rowNumber * 40}px`,
    }
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
                style={getItemStyle(word.length, number, prevPharase, index)}
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
        isShow={isShow}
        handleClickButtonContinue={handleClickButtonContinue}
        handleClickButtonDontKnow={handleClickButtonDontKnow}
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
  phrasesArray: PropTypes.array,
  puzzleItems: PropTypes.array,
  answerItems: PropTypes.array,
  prevPhraseArray: PropTypes.array,
  level: PropTypes.number,
  errorCount: PropTypes.number,
  isTranslation: PropTypes.bool,
  isAudio: PropTypes.bool,
  isAutoPlay: PropTypes.bool,
  isContinue: PropTypes.bool,
  isShow: PropTypes.bool,
  isCheck: PropTypes.bool,
  isEnd: PropTypes.bool,
  handleClickButtonTranslation: PropTypes.func,
  handleClickButtonAudio: PropTypes.func,
  handleClickButtonAutoPlay: PropTypes.func,
  handleClickButtonDontKnow: PropTypes.func,
  handleClickButtonContinue: PropTypes.func,
  updateIsShow: PropTypes.func,
  updateIsCheck: PropTypes.func,
  handleClickCheck: PropTypes.func,
  handleClickNewGame: PropTypes.func,
};

export default GamePageView;
