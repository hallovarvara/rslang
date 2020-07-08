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

const oldData = ({ userWord }) => (
  {
    oldRate: userWord?.optional?.rate || 0,
    oldRepeated: userWord?.optional?.repeated || 0,
  }
);

const handleChoseDifficulty = (word, onChangeProgress, level) => {
  const { oldRate, oldRepeated } = oldData(word);
  updateUserWordRate(word, level, oldRate, oldRepeated);
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
