import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty, applicationThings } from '../../../../../helpers/constants';
import {
  updateUserWordRate,
  // updateRepeatingWords,
} from '../../../../../helpers/wordsService';

const { HARD, NORMAL, EASY } = levelsOfDifficulty;
const { HARD_LABEL, NORMAL_LABEL, EASY_LABEL } = difficultLabels;
const { LEARN_WORDS } = applicationThings;

const handleChoseDifficulty = (word, onChangeProgress, level) => {
  updateUserWordRate(word, LEARN_WORDS, level);
  onChangeProgress({ isDifficultChosen: true });
};

const SpacingRepeating = (props) => {
  const { currentWord, onChangeProgress } = props;
  return (
    <div>
      <button onClick={() => handleChoseDifficulty({ ...currentWord }, onChangeProgress, HARD)}>
        <span>{HARD_LABEL.word}</span>
        <span>{HARD_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleChoseDifficulty({ ...currentWord }, onChangeProgress, NORMAL)}>
        <span>{NORMAL_LABEL.word}</span>
        <span>{NORMAL_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleChoseDifficulty({ ...currentWord }, onChangeProgress, EASY)}>
        <span>{EASY_LABEL.word}</span>
        <span>{EASY_LABEL.repeats}</span>
      </button>
    </div>
  );
};

SpacingRepeating.propTypes = {
  progress: PropTypes.object,
  currentWord: PropTypes.object,
  onChangeProgress: PropTypes.func,
};

export default SpacingRepeating;
