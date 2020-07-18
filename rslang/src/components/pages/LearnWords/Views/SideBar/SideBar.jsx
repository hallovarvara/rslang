import React from 'react';
import PropTypes from 'prop-types';
import { buttonsNames } from '../../helpers/constants';

const { SHOW_ANSWER, PREV, NEXT } = buttonsNames;

const SideBar = ({
  progress,
  isShownAnswerButton,
  onNextWord,
  onPrevWord,
  onShowTip,
  onPlayAudio,
}) => (
  <>
    {isShownAnswerButton && (
      <button className="learn-word-card-control__show-answer-button"
        onClick={() => {
          onShowTip();
          onPlayAudio();
        }
        }
        disabled={progress.isGuessed}
      >
        {SHOW_ANSWER}
      </button>
    )}
    <div className="flip-buttons-container">
      <div onClick={() => onPrevWord()} className="flip-buttons-container__prev-button">← {PREV}</div>
      <div onClick={() => onNextWord()} className="flip-buttons-container__next-button">{NEXT} →</div>
    </div>
  </>
);

SideBar.propTypes = {
  progress: PropTypes.object,
  word: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  onNextWord: PropTypes.func,
  onPrevWord: PropTypes.func,
  onShowTip: PropTypes.func,
  onPlayAudio: PropTypes.func,
};

export default SideBar;
