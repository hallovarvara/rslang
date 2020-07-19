import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import divideWordsIntoKnownAndMistakes from '../../../helpers/divide_words_into_known_and_mistakes';
import mapWordObjectToRowItem from '../../../helpers/map_word_object_to_row_item';

import { text, gamesData } from '../../../../../../helpers/constants';
import { getPath } from '../../../../../../helpers/functions';

const CurrentResultsPage = (props) => {
  const {
    levelChanged,
    currentLevel,
    currentActiveWords,
    currentWords,
    isGameInProcess,
    abortGame,
  } = props;

  if (!currentWords.length) {
    return <Redirect to={getPath(gamesData.speakit.startPath || gamesData.speakit.path)} />;
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
        <div className="results-buttons-container">
          <div className="results-buttons-container__return"><Link className="link-in-button" to="/speakit/game">{text.ru.return}</Link></div>
          <div className="results-buttons-container__new-game" onClick={() => {
            abortGame();
            levelChanged(currentLevel);
          }}>
            <Link className="link-in-button" to="/speakit/home">{text.ru.newGame}</Link>
          </div>
          <div className="results-buttons-container__latest-results">
            <Link to="/speakit/latest-results" className="link-in-button">{text.ru.button.lastResults}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentResultsPage.propTypes = {
  levelChanged: PropTypes.func,
  currentLevel: PropTypes.number,
  currentActiveWords: PropTypes.arrayOf(PropTypes.object),
  currentWords: PropTypes.arrayOf(PropTypes.object),
  isGameInProcess: PropTypes.bool,
  abortGame: PropTypes.func,
};

export default CurrentResultsPage;
