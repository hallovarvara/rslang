import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WordItem = ({ wordObj, onClick, isActive }) => {
  const { word, transcription, wordTranslate } = wordObj;
  const classes = classNames({
    'word-item': true,
    'word-item_active': isActive,
  });

  return (
    <div className={classes} onClick={onClick}>
        <span className="word-item__transcription-image"></span>
        <div className="word">
          <p className="word__eng">{word}</p>
          <p className="word__transcription">{transcription}</p>
          <p className="word__translation">{wordTranslate}</p>
        </div>
    </div>
  );
};

WordItem.propTypes = {
  wordObj: PropTypes.object,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default WordItem;
