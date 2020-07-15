import React from 'react';
import PropTypes from 'prop-types';
import { labels } from '../../helpers/constants';

const ShortStats = ({
  totalWords,
  mistakes,
  statsNewWordsCount,
  statsMistakesCount,
  statsRightAnswerSeries,
}) => {
  const rate = ((totalWords - mistakes) / totalWords) * 100;
  return (
    <div className="lw-short-stats__wrapper">
      <h3>{labels.statsTitle}</h3>
      <div>
        <p>{labels.statsCompletedCards}</p>
        <p>{totalWords}</p>
      </div>
      <div>
        <p>{labels.statsNewCards}</p>
        <p>{statsNewWordsCount}</p>
      </div>
      <div>
        <p>{labels.statsRightAnswers}</p>
        <p>{`${Math.floor(rate)} %`}</p>
      </div>
      <div>
        <p>{labels.statsMistakesCount}</p>
        <p>{statsMistakesCount}</p>
      </div>
      <div>
        <p>{labels.statsLongestSeries}</p>
        <p>{statsRightAnswerSeries}</p>
      </div>
    </div>
  );
};

ShortStats.propTypes = {
  totalWords: PropTypes.number,
  mistakes: PropTypes.number,
  statsNewWordsCount: PropTypes.number,
  statsMistakesCount: PropTypes.number,
  statsRightAnswerSeries: PropTypes.number,
};

export default ShortStats;
