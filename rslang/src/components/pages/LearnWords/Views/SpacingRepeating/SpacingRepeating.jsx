import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty } from '../../../../../helpers/constants';
import {
  updateUserWordRate,
  // updateRepeatingWords,
} from '../../../../../helpers/learnWords/dataServices';

const { HARD, NORMAL, EASY } = levelsOfDifficulty;
const { HARD_LABEL, NORMAL_LABEL, EASY_LABEL } = difficultLabels;

const handleHardWord = (word) => {
  updateUserWordRate(word, HARD);
};

const handleNormalWord = (word) => {
  updateUserWordRate(word, NORMAL);
};

const handleEasylWord = (word) => {
  updateUserWordRate(word, EASY);
};

const SpacingRepeating = (props) => {
  const { currentWord } = props;
  return (
    <div>
      <button onClick={() => handleHardWord(currentWord)}>
        <span>{HARD_LABEL.word}</span>
        <span>{HARD_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleNormalWord(currentWord)}>
        <span>{NORMAL_LABEL.word}</span>
        <span>{NORMAL_LABEL.repeats}</span>
      </button>
      <button onClick={() => handleEasylWord(currentWord)}>
        <span>{EASY_LABEL.word}</span>
        <span>{EASY_LABEL.repeats}</span>
      </button>
    </div>
  );
};

SpacingRepeating.propTypes = {
  currentWord: PropTypes.object,
};

export default SpacingRepeating;
