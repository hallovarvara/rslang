import React from 'react';
import PropTypes from 'prop-types';

const WordExtraInfo = ({
  word,
  transcription,
  textMeaning,
  textMeaningTranslate,
  isShownTranscription,
  isShownExampleSentence,
  isShownMeaning,
}) => (
    <div>
      <div>
        <p>{word}</p>
        {isShownTranscription && <p>{transcription}</p>}
      </div>
      {isShownExampleSentence && <p>{textMeaning}</p>}
      {isShownMeaning && <p>{textMeaningTranslate}</p>}
    </div>
);

WordExtraInfo.propTypes = {
  word: PropTypes.string,
  transcription: PropTypes.string,
  textMeaning: PropTypes.string,
  textMeaningTranslate: PropTypes.string,
  isShownTranscription: PropTypes.bool,
  isShownExampleSentence: PropTypes.bool,
  isShownMeaning: PropTypes.bool,
};

WordExtraInfo.defaultProps = {
  word: '',
  transcription: '',
  textMeaning: '',
  textMeaningTranslate: '',
  isShownTranscription: true,
  isShownExampleSentence: true,
  isShownMeaning: true,
};

export default WordExtraInfo;
