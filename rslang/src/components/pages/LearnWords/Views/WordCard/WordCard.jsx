import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from '../StatusBar';
import SideBar from '../SideBar';
import Word from '../Word';
import WordExtraInfo from '../WordExtraInfo';

const WordCard = ({
  textExample,
  textExampleTranslate,
  isShownTranslation,
  wordCount,
  totalWords,
  isShownComplicatedButton,
  baseUrl,
  image,
  isShownAnswerButton,
  isShownImageAssociation,
  word,
  transcription,
  textMeaning,
  textMeaningTranslate,
  isShownTranscription,
  isShownExampleSentence,
  isShownMeaning,
}) => (
  <div>
      {/* //TODO: Here will be Material UI ProgressBar with 'totalWords' / 'wordCount' */}
      <div>
        <StatusBar
          wordCount={wordCount}
          totalWords={totalWords}
          isShownComplicatedButton={isShownComplicatedButton}
        />
        <Word
          textExample={textExample}
          textExampleTranslate={textExampleTranslate}
          isShownTranslation={isShownTranslation}
        />
        <WordExtraInfo
          word={word}
          transcription={transcription}
          textMeaning={textMeaning}
          textMeaningTranslate={textMeaningTranslate}
          isShownTranscription={isShownTranscription}
          isShownExampleSentence={isShownExampleSentence}
          isShownMeaning={isShownMeaning}
        />
      </div>
      <div>
        <SideBar
          baseUrl={baseUrl}
          image={image}
          isShownAnswerButton={isShownAnswerButton}
          isShownImageAssociation={isShownImageAssociation}
        />
      </div>
  </div>
);

WordCard.propTypes = {
  textExampleTranslate: PropTypes.string,
  textExample: PropTypes.string,
  isShownTranslation: PropTypes.bool,
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
  baseUrl: PropTypes.string,
  image: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  isShownImageAssociation: PropTypes.bool,
  word: PropTypes.string,
  transcription: PropTypes.string,
  textMeaning: PropTypes.string,
  textMeaningTranslate: PropTypes.string,
  isShownTranscription: PropTypes.bool,
  isShownExampleSentence: PropTypes.bool,
  isShownMeaning: PropTypes.bool,
};

WordCard.defaultProps = {
  textExampleTranslate: '',
  textExample: '',
  isShownTranslation: true,
  wordCount: 0,
  totalWords: 0,
  isShownComplicatedButton: true,
  baseUrl: '',
  image: '',
  isShownAnswerButton: true,
  isShownImageAssociation: true,
  word: '',
  transcription: '',
  textMeaning: '',
  textMeaningTranslate: '',
  isShownTranscription: true,
  isShownExampleSentence: true,
  isShownMeaning: true,
};

export default WordCard;
