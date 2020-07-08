import React from 'react';
import PropTypes from 'prop-types';
import { buttonsNames } from '../../helpers/constants';
import { updateUserWordDifficulty, updateUserWordRemoved } from '../../../../../helpers/wordsService';

const { COMPLICATED, REMOVE } = buttonsNames;

export const handleWordRemove = (wordObject) => {
  updateUserWordRemoved(wordObject);
};

export const handleWordComplicated = (wordObject) => {
  updateUserWordDifficulty(wordObject);
};

const StatusBar = ({
  currentWord,
  wordCount,
  totalWords,
  isShownComplicatedButton,
}) => (
  <div>
    <div>{`${wordCount} / ${totalWords}`}</div>
    <div>
      {isShownComplicatedButton
          && <button onClick={() => handleWordComplicated(currentWord)} >
            {COMPLICATED}
          </button>
      }
        <button onClick={() => handleWordRemove(currentWord)} >
        {REMOVE}
      </button>
    </div>
  </div>
);

StatusBar.propTypes = {
  currentWord: PropTypes.object,
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
};

export default StatusBar;
