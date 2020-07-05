import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import mapResultsToItems from '../../../helpers/map_latest_results_to_items';

import GameTitle from '../../GameTitle';

const ResultsPage = ({
  currentWords,
  history,
  currentLevel,
  levelChanged,
}) => {
  if (currentWords === null) {
    return <Redirect to="/unmess/home" />;
  }

  return (
    <div className="results-page">
      <GameTitle />
      {
        mapResultsToItems([
          {
            results: currentWords,
            date: (new Date()).toLocaleString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }),
          },
        ], false)
      }
      <div
        onClick={() => {
          history.push('/unmess/home');
          levelChanged(currentLevel);
        }}
        className="results-page__play-again">Играть снова</div>
      <div
        onClick={() => history.push('/unmess/latest-results')}
        className="results-page__latest-results">Последние результаты</div>
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
