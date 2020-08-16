import React from 'react';
import PropTypes from 'prop-types';
import { getWidthWord, getBackgroundPosition } from '../../helpers';
import { heightRow } from '../../constants';
import Question from '../../components/Question';
import PhraseElements from '../../components/PhraseElements';
import GameHelpers from '../../components/GameHelpers';
import ButtonPanel from '../../components/ButtonPanel';
import FinishPage from '../FinishPage';
import StatisticPageView from '../StatisticPage';

const GamePageView = ({
  handleClickNewGame,
  questionList,
  level,
  phrasesArray,
  isTranslation,
  isBackground,
  isAudio,
  isAutoPlay,
  handleClickButtonTranslation,
  handleClickButtonAudio,
  handleClickButtonAutoPlay,
  handleClickButtonBackground,
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
  backgroundUrl,
  paintingInfo,
  isStatisticShow,
  statistic,
  handleShowStatistic,
}) => {
  const question = questionList[level];
  const phrase = phrasesArray[level];
  const phraseLength = (arr) => (arr.join('').length);
  const phraseLengthBefore = (arr, index) => (arr.slice(0, index).join('').length);
  const getItemStyle = (item, index, wordArray, rowNumber) => (
    {
      width: `${getWidthWord(item, phraseLength(wordArray))}%`,
      backgroundImage: `url(${isBackground ? backgroundUrl : ''})`,
      backgroundPosition:
        `-${getBackgroundPosition(phraseLengthBefore(wordArray, index), phraseLength(wordArray))}px 
        -${rowNumber * heightRow}px`,
    }
  );

  return (
    // eslint-disable-next-line no-nested-ternary
    question && phrase && !isEnd
      ? (<div>
      <GameHelpers
        handleClickButtonTranslation={handleClickButtonTranslation}
        handleClickButtonAudio={handleClickButtonAudio}
        handleClickButtonAutoPlay={handleClickButtonAutoPlay}
        handleClickButtonBackground={handleClickButtonBackground}
        isBackground={isBackground}
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
      <div className="puzzle__container">
        {(prevPhraseArray.length !== 0)
          ? (prevPhraseArray.map((prevPharase, index) => (
            <div key={index} className="puzzle__row">
            {prevPharase.map((word, number) => (
              <div
                style={getItemStyle(word.length, number, prevPharase, index)}
                className="puzzle__item"
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
          isBackground={isBackground}
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
          backgroundUrl={backgroundUrl}
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
      : (isStatisticShow
        ? <StatisticPageView
            statistic={statistic}
            handleShowStatistic={handleShowStatistic}
            handleClickNewGame={handleClickNewGame}
          />
        : <FinishPage
          paintingInfo={paintingInfo}
          handleClickNewGame={handleClickNewGame}
          errorCount={errorCount}
          isBackground={isBackground}
          backgroundUrl={backgroundUrl}
          handleShowStatistic={handleShowStatistic}
        />)
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
  isBackground: PropTypes.bool,
  handleClickButtonTranslation: PropTypes.func,
  handleClickButtonAudio: PropTypes.func,
  handleClickButtonAutoPlay: PropTypes.func,
  handleClickButtonDontKnow: PropTypes.func,
  handleClickButtonContinue: PropTypes.func,
  handleClickButtonBackground: PropTypes.func,
  updateIsShow: PropTypes.func,
  updateIsCheck: PropTypes.func,
  handleClickCheck: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  backgroundUrl: PropTypes.string,
  paintingInfo: PropTypes.object,
  isStatisticShow: PropTypes.bool,
  statistic: PropTypes.string,
  handleShowStatistic: PropTypes.func,
};

export default GamePageView;
