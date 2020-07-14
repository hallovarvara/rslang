import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { buttonsNames } from '../../helpers/constants';
// import {
//   updateUserWordDifficulty,
//   updateUserWordRemoved,
// } from '../../../../../helpers/wordsService';

const { COMPLICATED, REMOVE } = buttonsNames;

// export const handleWordRemove = (wordObject, onChangeProgress, isRemoved) => {
//   updateUserWordRemoved(wordObject);
//   onChangeProgress({ isRemoved: !isRemoved });
// };

// export const handleWordComplicated = (onChangeDifficulty) => {
//   updateUserWordDifficulty(wordObject);
//   onChangeProgress({ isComplicated: !isComplicated });
// };

const StatusBar = ({
  progress: { isRemoved, isComplicated },
  // onChangeProgress,
  // currentWord,
  wordCount,
  totalWords,
  isShownComplicatedButton,
  onChangeDifficulty,
  onChangeRemoved,
}) => (
  <div>
    {/* //TODO: Here will be Material UI ProgressBar with 'totalWords' / 'wordCount' */}
    <div>{`${wordCount} / ${totalWords}`}</div>
    <div>
      {isShownComplicatedButton
          && <button
          className={classNames({ active: isComplicated })}
          onClick={
            () => onChangeDifficulty()
          } >
            {COMPLICATED}
          </button>
      }
        <button
          className={classNames({ active: isRemoved })}
          onClick={
            () => onChangeRemoved()
          } >
        {REMOVE}
      </button>
    </div>
  </div>
);

StatusBar.propTypes = {
  progress: PropTypes.object,
  onChangeProgress: PropTypes.func,
  currentWord: PropTypes.object,
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
  onChangeDifficulty: PropTypes.func,
  onChangeRemoved: PropTypes.func,
};

export default StatusBar;
