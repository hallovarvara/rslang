import React from 'react';
import PropTypes from 'prop-types';

const StatusBar = ({
  wordCount,
  totalWords,
  isShownComplicatedButton,
}) => (
  <div>
    <div>{`${wordCount} / ${totalWords}`}</div>
    <div>
        {isShownComplicatedButton && <button>Complicated</button>}
        <button>Remove</button>
    </div>
  </div>
);

StatusBar.propTypes = {
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
};

StatusBar.defaultProps = {
  wordCount: 0,
  totalWords: 0,
  isShownComplicatedButton: true,
};

export default StatusBar;
