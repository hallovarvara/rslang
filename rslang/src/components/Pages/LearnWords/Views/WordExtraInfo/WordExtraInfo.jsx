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
    <div>
      <div>
        {
          isGuessed && <div>
          {/* TODO: Please, replace buton text 'play' to an appropriate icon */}
            <button onClick={() => onPlayAudio('audio')}>Play</button>
            <p>{word}</p>
          </div>
        }
        <p>{isGuessed && wordTranslate}</p>
        {isGuessed && isShownTranscription && <p>{transcription}</p>}
      </div>
      {
        isShownExampleSentence && <div>
          {/* TODO: Please, replace buton text 'play' to an appropriate icon */}
          {isGuessed && <button onClick={() => onPlayAudio('audioMeaning')}>Play</button>}
          <span>{begin}</span>
          <span style={isGuessed ? showWordStyles : hideWordStyles}>{emphasis}</span>
          <span>{end}</span>
        </div>
      }
      {isGuessed && isShownMeaning && <div>
        {/* TODO: Please, replace buton text 'play' to an appropriate icon */}
        <p>{textMeaningTranslate}</p>
      </div>}
    </div>
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
