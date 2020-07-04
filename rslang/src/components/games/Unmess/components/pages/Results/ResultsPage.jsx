import React from 'react';
import PropTypes from 'prop-types';

import replaceTagInString from '../../../helpers/remove_tag_from_string';

import GameTitle from '../../GameTitle';

const ResultsPage = ({ currentWords, history }) => {
  const rightWords = [];
  const wrongWords = [];

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
                <div key={`${wordObj.id}-right`} className="right-word-container">
                  <span className="right-word-container__word">{wordObj.word}</span>
                  <span className="right-word-container__definition">{
                    replaceTagInString(wordObj.textMeaning, wordObj.word)
                  }</span>
                  <div className="right-word-container__audio-icon">
                    <span className="audio-icon"></span>
                  </div>
              </div>
              ))
            }
          </div>
        </div>
        <div className="wrong-container">
          <p className="wrong-container__count">Неправильно <span>{wrongWords.length}</span></p>
          <div className="wrong-words-container">
            {
              wrongWords.map((wordObj) => (
                <div
                  key={`${wordObj.id}-wrong`}
                  className="wrong-word-container">
                  <span className="wrong-word-container__word">{wordObj.word}</span>
                  <span className="wrong-word-container__definition">{
                    replaceTagInString(wordObj.textMeaning, wordObj.word)
                  }</span>
                  <div className="wrong-word-container__audio-icon">
                    <span className="audio-icon"></span>
                  </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>
      <div
        onClick={() => history.push('/unmess/home')}
        className="game-page__play-again">Играть снова</div>
    </div>
  );
};

ResultsPage.propTypes = {
  currentWords: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

export default ResultsPage;
