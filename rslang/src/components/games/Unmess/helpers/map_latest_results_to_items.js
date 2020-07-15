import React from 'react';

import mapWordsObjectsToItems from './map_words_objects_to_result_items';

const mapLatestResultsToItems = (results, showDate) => (
  results.map((resultObj) => {
    const rightWords = [];
    const wrongWords = [];

    resultObj.results.forEach((wordObj) => {
      if (wordObj.attempt) {
        rightWords.push({ ...wordObj });
      } else {
        wrongWords.push({ ...wordObj });
      }
    });

    return (
      <React.Fragment key={resultObj.date}>
        {
          showDate
            ? <div className="results-container__date">{resultObj.date}</div>
            : null
        }
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
      </React.Fragment>
    );
  })
);

export default mapLatestResultsToItems;
