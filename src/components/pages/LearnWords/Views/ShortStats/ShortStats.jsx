import React from 'react';
import PropTypes from 'prop-types';
import { labels } from '../../helpers/constants';

const ShortStats = ({
  wordCards,
  mistakes,
  statsNewWordsCount,
  statsMistakesCount,
  statsRightAnswerSeries,
}) => {
  const rate = wordCards <= mistakes
    ? 100
    : ((wordCards - mistakes) / wordCards) * 100 || 100;
  return (
    <div className="lw-short-stats__wrapper">
      <h1>{labels.statsTitle}</h1>
      <div className="lw-stats__data">
        <div className="lw-stats__item">
          <p className="lw-stats__label-text">{labels.statsCompletedCards}</p>
          <p className="lw-stats__value">{wordCards}</p>
        </div>
        <div className="lw-stats__item">
          <p className="lw-stats__label-text">{labels.statsNewCards}</p>
          <p className="lw-stats__value">{statsNewWordsCount}</p>
        </div>
        <div className="lw-stats__item">
          <p className="lw-stats__label-text">{labels.statsRightAnswers}</p>
          <p className="lw-stats__value">{`${Math.floor(rate)} %`}</p>
        </div>
        <div className="lw-stats__item">
          <p className="lw-stats__label-text">{labels.statsMistakesCount}</p>
          <p className="lw-stats__value">{statsMistakesCount}</p>
        </div>
        <div className="lw-stats__item">
          <p className="lw-stats__label-text">{labels.statsLongestSeries}</p>
          <p className="lw-stats__value">{statsRightAnswerSeries}</p>
        </div>
      </div>
    </div>
  );
};

ShortStats.propTypes = {
  wordCards: PropTypes.number,
  mistakes: PropTypes.number,
  statsNewWordsCount: PropTypes.number,
  statsMistakesCount: PropTypes.number,
  statsRightAnswerSeries: PropTypes.number,
};

export default ShortStats;
