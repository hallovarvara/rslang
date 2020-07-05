import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import replaceTagInString from '../../../helpers/remove_tag_from_string';
import playAudio from '../../../../../../helpers/play_audio';
import { apiLinks } from '../../../../../../helpers/constants';

import GameTitle from '../../GameTitle';

const mapWordsObjectsToItems = (wordObj, classesPrefix) => (
  <div
    onClick={() => playAudio(`${apiLinks.file}${wordObj.audioMeaning}`)}
    key={`${wordObj.id}-${classesPrefix}`}
    className={`${classesPrefix}-word-container`}>
    <span className={`${classesPrefix}-word-container__word`}>{wordObj.word}</span>
    <span className={`${classesPrefix}-word-container__definition`}>{
      replaceTagInString(wordObj.textMeaning, wordObj.word)
    }</span>
    <div className={`${classesPrefix}-word-container__audio-icon`}>
      <span className="audio-icon"></span>
    </div>
  </div>
);

const ResultsPage = ({
  currentWords,
  history,
  currentLevel,
  levelChanged,
}) => {
  const rightWords = [];
  const wrongWords = [];

  if (currentWords === null) {
    return <Redirect to="/unmess/home" />;
  }

  currentWords.forEach((wordObj) => {
    if (wordObj.attempt) {
      rightWords.push({ ...wordObj });
    } else {
      wrongWords.push({ ...wordObj });
    }
  });

  return (
    <div className="results-page">
      <GameTitle />
      <div className="results-container">
        <div className="right-container">
          <p className="right-container__count">Правильно <span>{rightWords.length}</span></p>
          <div className="right-words-container">
            {
              rightWords.map((wordObj) => (
                mapWordsObjectsToItems(wordObj, 'right')
              ))
            }
          </div>
        </div>
        <div className="wrong-container">
          <p className="wrong-container__count">Неправильно <span>{wrongWords.length}</span></p>
          <div className="wrong-words-container">
            {
              wrongWords.map((wordObj) => (
                mapWordsObjectsToItems(wordObj, 'wrong')
              ))
            }
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          history.push('/unmess/home');
          levelChanged(currentLevel);
        }}
        className="game-page__play-again">Играть снова</div>
    </div>
  );
};

ResultsPage.propTypes = {
  currentWords: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
  currentLevel: PropTypes.number,
  levelChanged: PropTypes.func,
};

export default ResultsPage;
