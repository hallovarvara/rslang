import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GameTitle from '../../GameTitle';

import mapLatestResultsToItems from '../../../helpers/map_latest_results_to_items';
import { localStorageItems } from '../../../../helpers/contants';

const LatestResults = (props) => {
  const {
    history,
    levelChanged,
    currentLevel,
    currentWords,
  } = props;

  if (currentWords === null) {
    return <Redirect to="/unmess/home" />;
  }

  const latestResults = JSON.parse(localStorage.getItem(localStorageItems.latestResults));

  return (
    <div className="results-page">
      <GameTitle />
      {
        mapLatestResultsToItems(latestResults, true)
      }
      <div
        onClick={() => {
          history.push('/unmess/home');
          levelChanged(currentLevel);
        }}
        className="results-page__play-again">Играть снова</div>
      <div
        onClick={() => history.push('/unmess/results')}
        className="results-page__current-results">Текущие результаты</div>
    </div>
  );
};

LatestResults.propTypes = {
  history: PropTypes.object,
  levelChanged: PropTypes.func,
  currentLevel: PropTypes.number,
  currentWords: PropTypes.arrayOf(PropTypes.object),
};

export default LatestResults;
