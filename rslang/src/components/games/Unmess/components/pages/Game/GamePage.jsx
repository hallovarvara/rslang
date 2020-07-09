import React from 'react';
import PropTypes from 'prop-types';

import replaceTagInString from '../../../helpers/remove_tag_from_string';

import GameTitle from '../../GameTitle';

const GamePage = (props) => {
  const {
    untouchedWords,
    dragStart,
    touchStart,
    dragEnd,
    dragEnter,
    dragLeave,
    drop,
    untouchedDefinitions,
    guessedWords,
    wrongWords,
    showDefinition,
  } = props;

  return (
    <div className="game-page">
      <GameTitle />
      <div className="game-container">
        <div className="words-container">
          {
            untouchedWords.map((wordObj) => (
                <div
                  key={`${wordObj.id}-word`}
                  className="words-container__word flex-div-with-span"
                  draggable="true"
                  onDragStart={(event) => {
                    dragStart(event, wordObj);
                  }}
                  onTouchStart={(event) => {
                    touchStart(event, wordObj);
                  }}
                  onDragEnd={(event) => {
                    dragEnd(event);
                  }}>
                  <span>{wordObj.word}</span>
                </div>
            ))
          }
        </div>
        <div className="definitions-container">
          {
            untouchedDefinitions.map((wordObj) => (
              <div
                data-id={wordObj.id}
                key={`${wordObj.id}-definition`}
                className="definitions-container__definition flex-div-with-span"
                onDragEnter={(event) => {
                  dragEnter(event);
                }}
                onDragLeave={(event) => {
                  dragLeave(event);
                }}
                onDrop={(event) => {
                  drop(event, wordObj);
                }}
                >
                <span>{wordObj.textMeaning.replace(/<i>.*<\/i>/, '…')}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className="attempts-container">
        <div className="right-attempts-container">
          {
            guessedWords.map((wordObj) => (
              <div key={wordObj.id} className="right-attempt">
                <div className="right-attempt__word flex-div-with-span">
                  <span>{wordObj.word}</span>
                </div>
                <div className="right-attempt__definition flex-div-with-span">
                  <span>{replaceTagInString(wordObj.textMeaning, wordObj.word)}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className="wrong-attempts-container">
          {
            wrongWords.map((wordObj) => (
              <div key={wordObj.id} className="wrong-attempt">
                <div className="wrong-attempt__word flex-div-with-span">
                  <span>{wordObj.word}</span>
                </div>
                {wordObj.hideDefinition === true
                  ? (
                   <div
                      className="wront-attempt__show-answer flex-div-with-span">
                      <span onClick={() => showDefinition(wordObj)}>Показать ответ</span>
                    </div>
                  )
                  : (
                    <div className="wrong-attempt__definition flex-div-with-span">
                      <span>{replaceTagInString(wordObj.textMeaning, wordObj.word)}</span>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

GamePage.propTypes = {
  untouchedWords: PropTypes.arrayOf(PropTypes.object),
  dragStart: PropTypes.func,
  untouchedDefinitions: PropTypes.arrayOf(PropTypes.object),
  guessedWords: PropTypes.arrayOf(PropTypes.object),
  wrongWords: PropTypes.arrayOf(PropTypes.object),
  showDefinition: PropTypes.func,
  dragEnd: PropTypes.func,
  dragEnter: PropTypes.func,
  dragLeave: PropTypes.func,
  drop: PropTypes.func,
};

export default GamePage;
