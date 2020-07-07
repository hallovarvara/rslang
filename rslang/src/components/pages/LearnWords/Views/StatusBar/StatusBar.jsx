import React from 'react';
import PropTypes from 'prop-types';
import { buttonsNames } from '../../helpers/constants';

const { COMPLICATED, REMOVE } = buttonsNames;

const StatusBar = ({ wordCount, totalWords, isShownComplicatedButton }) => (
  <div>
    <div>{`${wordCount} / ${totalWords}`}</div>
    <div>
      {isShownComplicatedButton && <button>{COMPLICATED}</button>}
      <button>{REMOVE}</button>
    </div>
  </div>
);

StatusBar.propTypes = {
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
};

export default StatusBar;
