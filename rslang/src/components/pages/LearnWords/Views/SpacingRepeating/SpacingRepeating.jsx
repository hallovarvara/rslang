import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty } from '../../../../../helpers/constants';
import {
  updateUserWordRate,
  // updateRepeatingWords,
} from '../../../../../helpers/wordsService';

const { HARD, NORMAL, EASY } = levelsOfDifficulty;
const { HARD_LABEL, NORMAL_LABEL, EASY_LABEL } = difficultLabels;

const handleHardWord = (word, onChangeProgress) => {
  updateUserWordRate(word, HARD);
  onChangeProgress({ isDifficultChosen: true });
};

const handleNormalWord = (word, onChangeProgress) => {
  updateUserWordRate(word, NORMAL);
  onChangeProgress({ isDifficultChosen: true });
};

const handleEasylWord = (word, onChangeProgress) => {
  updateUserWordRate(word, EASY);
  onChangeProgress({ isDifficultChosen: true });
};

const SpacingRepeating = (props) => {
  const { currentWord, onChangeProgress } = props;
  return (
    <div>
      <button onClick={() => handleHardWord(currentWord, onChangeProgress)}>
        <span>{HARD_LABEL.word}</span>
        <span>{HARD_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleNormalWord(currentWord, onChangeProgress)}>
        <span>{NORMAL_LABEL.word}</span>
        <span>{NORMAL_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleEasylWord(currentWord, onChangeProgress)}>
        <span>{EASY_LABEL.word}</span>
        <span>{EASY_LABEL.repeats}</span>
      </button>
    </div>
  );
};

SpacingRepeating.propTypes = {
  currentWord: PropTypes.object,
  onChangeProgress: PropTypes.func,
};

export default SpacingRepeating;
