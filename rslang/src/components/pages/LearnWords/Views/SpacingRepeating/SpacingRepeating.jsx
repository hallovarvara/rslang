import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty } from '../../../../../helpers/constants';

const { HARD, NORMAL, EASY } = levelsOfDifficulty;
const { HARD_LABEL, NORMAL_LABEL, EASY_LABEL } = difficultLabels;

const handleChoseDifficulty = (
  onChangeRepeated, onChangeWordRate,
  level,
  isFirstPassDone,
  onChangeProgress,
) => {
  if (isFirstPassDone) {
    onChangeRepeated();
  } else {
    onChangeWordRate(level, { isDifficultChosen: true });
  }
  // onChangeProgress({ isDifficultChosen: true });
};

const SpacingRepeating = (props) => {
  const {
    isFirstPassDone,
    onChangeWordRate,
    onChangeRepeated,
    onChangeProgress,
  } = props;
  return (
    <div>
      <button
        onClick={() => handleChoseDifficulty(
          onChangeRepeated,
          onChangeWordRate,
          HARD,
          isFirstPassDone,
          onChangeProgress,
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
          onChangeProgress,
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
          onChangeProgress,
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
  onChangeProgress: PropTypes.func,
};

export default SpacingRepeating;
