import React from 'react';
import PropTypes from 'prop-types';
import { difficultLabels } from '../../helpers/constants';
import { levelsOfDifficulty, pagesData } from '../../../../../helpers/constants';

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
    onChangeWordRate(level);
  }
  onChangeProgress({ isDifficultChosen: true });
};

const SpacingRepeating = (props) => {
  const {
    isFirstPassDone,
    onChangeWordRate,
    onChangeRepeated,
    onChangeProgress,
  } = props;
  return (
    <>
      <div className="line learn-word-card-info__line"></div>
      <div className="learn-word-repeating-container">
        <p className="learn-word-repeating-container__description">{pagesData.learnWords.rateDescription}</p>
        <div className="learn-word-repeating-buttons-container">
          <button className="learn-word-repeating-buttons-container__button"
            onClick={() => handleChoseDifficulty(
              onChangeRepeated,
              onChangeWordRate,
              HARD,
              isFirstPassDone,
              onChangeProgress,
            )
            }
          >
            {HARD_LABEL.word}
          </button>
          <button className="learn-word-repeating-buttons-container__button"
            onClick={() => handleChoseDifficulty(
              onChangeRepeated,
              onChangeWordRate,
              NORMAL,
              isFirstPassDone,
              onChangeProgress,
            )
            }
          >
            {NORMAL_LABEL.word}
          </button>
          <button className="learn-word-repeating-buttons-container__button"
            onClick={() => handleChoseDifficulty(
              onChangeRepeated, onChangeWordRate,
              EASY,
              isFirstPassDone,
              onChangeProgress,
            )
            }
          >
            {EASY_LABEL.word}
          </button>
        </div>
      </div>
    </>
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
