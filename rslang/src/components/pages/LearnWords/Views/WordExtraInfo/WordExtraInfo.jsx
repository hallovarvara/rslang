import React from 'react';
import PropTypes from 'prop-types';
import { hideWordStyles, showWordStyles } from '../../helpers/style-options';

const WordExtraInfo = ({
  progress,
  word,
  wordTranslate,
  transcription,
  textMeaning,
  textMeaningTranslate,
  isShownTranscription,
  isShownExampleSentence,
  isShownMeaning,
  onPlayAudio,
}) => {
  const { begin, emphasis, end } = textMeaning;
  const { isGuessed } = progress;
  return (
    <>
      <div className="target-learn-word-container">
        {
          isGuessed && <>
            <p className="target-learn-word-container__target-word">{word}</p>
            <span className="target-learn-word-container__volume-icon" onClick={() => onPlayAudio('audio')}></span>
          </>
        }
        {isGuessed && <p className="target-learn-word-container__target-word-translation">{wordTranslate}</p>}
        {isGuessed && isShownTranscription && <p className="target-learn-word-container__transcription">{transcription}</p>}
      </div>
      {
        isGuessed && isShownMeaning
          && <p className="learn-word-card-info__explanation">
          <span className="autoplay-icon"></span>{textMeaningTranslate}
        </p>
      }
      {
        isShownExampleSentence && <p className="learn-word-card-info__example-sentence">
          <span onClick={() => onPlayAudio('audioMeaning')} className="autoplay-icon"></span>
          {begin}<span style={isGuessed ? showWordStyles : hideWordStyles}>{emphasis}</span>{end}
        </p>
      }
    </>
  );
};

WordExtraInfo.propTypes = {
  progress: PropTypes.object,
  word: PropTypes.string,
  wordTranslate: PropTypes.string,
  transcription: PropTypes.string,
  textMeaning: PropTypes.object,
  textMeaningTranslate: PropTypes.string,
  isShownTranscription: PropTypes.bool,
  isShownExampleSentence: PropTypes.bool,
  isShownMeaning: PropTypes.bool,
  onPlayAudio: PropTypes.func,
};

export default WordExtraInfo;
