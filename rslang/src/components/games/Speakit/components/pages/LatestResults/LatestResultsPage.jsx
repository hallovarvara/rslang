import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { withLocalStorageService } from '../../../../hoc';
import divideWordsIntoKnownAndMistakes from '../../../helpers/divide_words_into_known_and_mistakes';
import mapWordObjectToRowItem from '../../../helpers/map_word_object_to_row_item';

import { text, gamesData } from '../../../../../../helpers/constants';
import { getPath } from '../../../../../../helpers/functions';

const mapLatestResultsToItems = (results) => {
  const { allWords, guessedWords } = results;
  const { known, mistakes } = divideWordsIntoKnownAndMistakes(allWords, guessedWords);
  return (
    <div key={results.date} className="results-container">
      <div className="results-container__data">{results.date}</div>
      <div className="results-container__mistakes-count">{`${text.ru.speakit.mistakes} - ${mistakes.length}`}</div>
      <div className="mistakes-container">
        {
          mistakes.map(mapWordObjectToRowItem)
        }
    </div>
      <div className="results-container__know-count">{`${text.ru.speakit.know} - ${known.length}`}</div>
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
    loading,
    abortGame,
  } = props;
  if (loading) {
    return <Redirect to={getPath(gamesData.speakit.startPath || gamesData.speakit.path)}/>;
  }

  const latestResults = localStorageService.getLatestResults();

  return (
    <div className="results-page">
      <div className="results">
        {
          latestResults.length === 0
            ? <div>{text.ru.speakit.noResults}</div>
            : latestResults.map(mapLatestResultsToItems)
        }
        <div className="results-buttons-container">
          <div className="results-buttons-container__return">
            <Link className="link-in-button" to="/speakit/game">{text.ru.return}</Link>
          </div>
          <div className="results-buttons-container__new-game" onClick={() => {
            abortGame();
            levelChanged(currentLevel);
          }}>
            <Link className="link-in-button" to="/speakit/home">{text.ru.newGame}</Link>
          </div>
          <div className="results-buttons-container__current-results">
          <Link className="link-in-button" to="/speakit/current-results">{text.ru.currentResults}</Link>
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
  loading: PropTypes.bool,
  abortGame: PropTypes.func,
};

export default withLocalStorageService()(LatestResultsPage);
