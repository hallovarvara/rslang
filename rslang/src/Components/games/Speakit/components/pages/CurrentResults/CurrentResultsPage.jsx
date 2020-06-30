import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PreloaderContainer from '../../PreloaderContainer';
import divideWordsIntoKnownAndMistakes from '../../../helpers/divide_words_into_known_and_mistakes';
import mapWordObjectToRowItem from '../../../helpers/map_word_object_to_row_item';

const CurrentResultsPage = (props) => {
  const {
    loading,
    levelChanged,
    currentLevel,
    currentActiveWords,
    currentWords,
    isGameInProcess,
  } = props;

  if (loading) {
    return <PreloaderContainer />;
  }

  let { known, mistakes } = divideWordsIntoKnownAndMistakes(currentWords, currentActiveWords);

  if (!isGameInProcess) {
    known = [];
    mistakes = [...currentWords];
  }

  return (
    <div className="results-page">
      <div className="results">
        <div className="results-container">
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
        <div className="results-buttons-container">
          <div className="results-buttons-container__return"><Link className="link-in-button" to="/speakit/game">Return</Link></div>
          <div className="results-buttons-container__new-game" onClick={() => levelChanged(currentLevel)}>
            <Link className="link-in-button" to="/speakit/game">New game</Link>
          </div>
          <div className="results-buttons-container__latest-results">
            <Link to="/speakit/latest-results" className="link-in-button">Latest results</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentResultsPage.propTypes = {
  loading: PropTypes.bool,
  levelChanged: PropTypes.func,
  currentLevel: PropTypes.number,
  currentActiveWords: PropTypes.arrayOf(PropTypes.object),
  currentWords: PropTypes.arrayOf(PropTypes.object),
  isGameInProcess: PropTypes.bool,
};

export default CurrentResultsPage;
