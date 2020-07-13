import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty } from '../../../../../helpers/constants';
// import {
//   updateUserWordRate,
//   updateUserWordRepeated,
// } from '../../../../../helpers/wordsService';

const { HARD, NORMAL, EASY } = levelsOfDifficulty;
const { HARD_LABEL, NORMAL_LABEL, EASY_LABEL } = difficultLabels;

const handleChoseDifficulty = (
  onChangeRepeated, onChangeWordRate,
  level,
  isFirstPassDone,
) => {
  if (isFirstPassDone) {
    onChangeRepeated();
  } else {
    onChangeWordRate(level);
  }
};

const SpacingRepeating = (props) => {
  const { isFirstPassDone, onChangeWordRate, onChangeRepeated } = props;
  return (
    <div>
      <button
        onClick={() => handleChoseDifficulty(
          onChangeRepeated,
          onChangeWordRate,
          HARD,
          isFirstPassDone,
        )
        }
      >
        <span>{HARD_LABEL.word}</span>
        <span>{HARD_LABEL.repeats}</span>
      </button>
      <button
        onClick={() => handleChoseDifficulty(
          onChangeRepeated,
          onChangeWordRate,
          NORMAL,
          isFirstPassDone,
        )
        }
      >
        <span>{NORMAL_LABEL.word}</span>
        <span>{NORMAL_LABEL.repeats}</span>
      </button>
      <button
        onClick={() => handleChoseDifficulty(
          onChangeRepeated, onChangeWordRate,
          EASY,
          isFirstPassDone,
        )
        }
      >
        <span>{EASY_LABEL.word}</span>
        <span>{EASY_LABEL.repeats}</span>
      </button>
    </div>
  );
};

SpacingRepeating.propTypes = {
  isFirstPassDone: PropTypes.bool,
  progress: PropTypes.object,
  currentWord: PropTypes.object,
  onChangeWordRate: PropTypes.func,
  onChangeRepeated: PropTypes.func,
};

export default SpacingRepeating;
