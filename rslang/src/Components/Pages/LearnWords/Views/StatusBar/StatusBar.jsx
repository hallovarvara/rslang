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
      {isShownComplicatedButton && <button>Сложное слово</button>}
      <button>Удалить</button>
    </div>
  </div>
);

StatusBar.propTypes = {
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
};

export default StatusBar;
