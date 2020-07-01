import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withLocalStorageService } from '../../../../hoc';
import divideWordsIntoKnownAndMistakes from '../../../helpers/divide_words_into_known_and_mistakes';
import mapWordObjectToRowItem from '../../../helpers/map_word_object_to_row_item';

const mapLatestResultsToItems = (results) => {
  const { allWords, guessedWords } = results;
  const { known, mistakes } = divideWordsIntoKnownAndMistakes(allWords, guessedWords);
  return (
    <div key={results.date} className="results-container">
      <div className="results-container__data">{results.date}</div>
      <div className="results-container__mistakes-count">{`Ошибок - ${mistakes.length}`}</div>
      <div className="mistakes-container">
        {
          mistakes.map(mapWordObjectToRowItem)
        }
    </div>
      <div className="results-container__know-count">{`Знаю - ${known.length}`}</div>
      <div className="know-container">
        {
          known.map(mapWordObjectToRowItem)
        }
      </div>
    </div>
  );
};

const LatestResultsPage = (props) => {
  const {
    localStorageService,
    levelChanged,
    currentLevel,
  } = props;
  const latestResults = localStorageService.getLatestResults();

  return (
    <div className="results-page">
      <div className="results">
        {}
        {
          latestResults.length === 0
            ? <div>{'You haven\'t any results yet :('}</div>
            : latestResults.map(mapLatestResultsToItems)
        }
        <div className="results-buttons-container">
          <div className="results-buttons-container__return">
            <Link className="link-in-button" to="/speakit/game">Return</Link>
          </div>
          <div className="results-buttons-container__new-game" onClick={() => levelChanged(currentLevel)}>
            <Link className="link-in-button" to="/speakit/game">New game</Link>
          </div>
          <div className="results-buttons-container__current-results">
            <Link className="link-in-button" to="/speakit/current-results">Current results</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

LatestResultsPage.propTypes = {
  localStorageService: PropTypes.object,
  levelChanged: PropTypes.func,
  currentLevel: PropTypes.number,
};

export default withLocalStorageService()(LatestResultsPage);
