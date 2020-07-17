import React from 'react';
import PropTypes from 'prop-types';
import {
  inputField,
  inputWrapper,
} from '../../helpers/style-options';
import {
  prepareRightAnswerStyles,
  prepareWrongAnswerStyles,
  mapSentenceToSpanItems,
} from '../../helpers';
import CheckedSentense from '../CheckedSentence';

const Word = (props) => {
  const {
    progress,
    textExample,
    textExampleTranslate,
    isShownTranslation,
    onPlayAudio,
    value,
    handleSubmit,
    handleInput,
  } = props;
  const { begin, emphasis, end } = textExample;
  const {
    isGuessed,
    isShownWord,
    isWordSemiOpacity,
    difference,
  } = progress;
  const wrongAnswerStyles = prepareWrongAnswerStyles(
    isShownWord,
    isWordSemiOpacity,
  );
  const rightAnswerStyles = prepareRightAnswerStyles(isGuessed);
  const output = difference ? (
    <CheckedSentense sentence={difference} styles={wrongAnswerStyles} />
  ) : (
    <span style={rightAnswerStyles}>{emphasis}</span>
  );
  return (
    <>
      <div className="learn-word-card-sentence">
        {isGuessed && (
          <span className="autoplay-icon" onClick={() => onPlayAudio('audioExample')}></span>
        )}
        <div className="lw-word-card-sentence-words-container">
          {mapSentenceToSpanItems(begin)}
          <div className="lw-form-container" style={{ position: 'relative', display: 'inline' }}>
            {output}
            <form style={inputWrapper} onSubmit={handleSubmit}>
              <input
                type="text"
                style={inputField}
                autoComplete="off"
                autoFocus="on"
                disabled={isGuessed}
                onChange={handleInput}
                value={value}
              />
            </form>
          </div>
          {mapSentenceToSpanItems(end)}
        </div>
      </div>
      {isGuessed && isShownTranslation && <p className="learn-word-card-info__sentence-translation">{textExampleTranslate}</p>}
    </>
  );
};

Word.propTypes = {
  progress: PropTypes.object,
  textExampleTranslate: PropTypes.string,
  textExample: PropTypes.object,
  isShownTranslation: PropTypes.bool,
  onChangeProgress: PropTypes.func,
  onPlayAudio: PropTypes.func,
  onStatsChanged: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleInput: PropTypes.func,
  value: PropTypes.string,
};

export default Word;
