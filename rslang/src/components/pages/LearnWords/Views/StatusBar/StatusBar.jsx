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
  wordCount,
  totalWords,
  isShownComplicatedButton,
  onChangeDifficulty,
  onChangeRemoved,
  // currentWord,
}) => (
  <div className="learn-word-card-general-info">
    <p className="learn-word-card-general-info__all-done">{`${wordCount}/${totalWords}`}</p>
    <div className="learn-word-status-settings">
      {isShownComplicatedButton
          && <div
          className={classNames({
            'learn-word-status-settings__complicated': true,
            active: isComplicated,
          })}
          onClick={
            () => onChangeDifficulty()
          } >
            <span></span>{COMPLICATED}
          </div>
      }
        <div
          className={classNames({
            'learn-word-status-settings__remove': true,
            active: isRemoved,
          })}
          onClick={
            () => onChangeRemoved()
          } >
        <span></span>{REMOVE}
      </div>
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
