import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from '../StatusBar';
import SideBar from '../SideBar';
import Word from '../Word';
import WordExtraInfo from '../WordExtraInfo';
import SpacingRepeating from '../SpacingRepeating';
import { initialProgressObject } from '../../helpers/settings';

const WordCard = ({
  currentWord,
  isFirstPassDone,
  currentInput,
  progress,
  textExample,
  textExampleTranslate,
  isShownTranslation,
  wordCount,
  totalWords,
  isShownComplicatedButton,
  image,
  isShownAnswerButton,
  isShownImageAssociation,
  word,
  wordTranslate,
  transcription,
  textMeaning,
  textMeaningTranslate,
  isShownTranscription,
  isShownExampleSentence,
  isShownMeaning,
  onNextWord,
  onPrevWord,
  onChangeProgress,
  onPlayAudio,
  onChangeWordRate,
  onChangeRepeated,
  onStatsChanged,
  onShowTip,
  onChangeRemoved,
  onChangeDifficulty,
}) => (
  <div>
    <div>
      <StatusBar
        progress={progress}
        wordCount={wordCount}
        totalWords={totalWords}
        isShownComplicatedButton={isShownComplicatedButton}
        onChangeRemoved={onChangeRemoved}
        onChangeDifficulty={onChangeDifficulty}
      />
      <Word
        progress={progress}
        textExample={textExample}
        textExampleTranslate={textExampleTranslate}
        isShownTranslation={isShownTranslation}
        onChangeProgress={onChangeProgress}
        onPlayAudio={onPlayAudio}
        onStatsChanged={onStatsChanged}
      />
      <WordExtraInfo
        progress={progress}
        word={word}
        wordTranslate={wordTranslate}
        transcription={transcription}
        textMeaning={textMeaning}
        textMeaningTranslate={textMeaningTranslate}
        isShownTranscription={isShownTranscription}
        isShownExampleSentence={isShownExampleSentence}
        isShownMeaning={isShownMeaning}
        onPlayAudio={onPlayAudio}
      />
      {progress.isGuessed && !progress.isDifficultChosen && (
        <SpacingRepeating
          isFirstPassDone={isFirstPassDone}
          progress={progress}
          currentWord={currentWord}
          onChangeWordRate={onChangeWordRate}
          onChangeRepeated={onChangeRepeated}
          onChangeProgress={onChangeProgress}
        />
      )}
    </div>
    <div>
      <SideBar
        progress={progress}
        currentInput={currentInput}
        word={word}
        image={image}
        isShownAnswerButton={isShownAnswerButton}
        isShownImageAssociation={isShownImageAssociation}
        onNextWord={onNextWord}
        onPrevWord={onPrevWord}
        onShowTip={onShowTip}
      />
    </div>
  </div>
);

WordCard.propTypes = {
  currentWord: PropTypes.object,
  isFirstPassDone: PropTypes.bool,
  currentInput: PropTypes.string,
  progress: PropTypes.object,
  textExampleTranslate: PropTypes.string,
  textExample: PropTypes.object,
  isShownTranslation: PropTypes.bool,
  wordCount: PropTypes.number,
  totalWords: PropTypes.number,
  isShownComplicatedButton: PropTypes.bool,
  word: PropTypes.string,
  wordTranslate: PropTypes.string,
  image: PropTypes.string,
  isShownAnswerButton: PropTypes.bool,
  isShownImageAssociation: PropTypes.bool,
  transcription: PropTypes.string,
  textMeaning: PropTypes.object,
  textMeaningTranslate: PropTypes.string,
  isShownTranscription: PropTypes.bool,
  isShownExampleSentence: PropTypes.bool,
  isShownMeaning: PropTypes.bool,
  onNextWord: PropTypes.func,
  onPrevWord: PropTypes.func,
  onChangeProgress: PropTypes.func,
  onPlayAudio: PropTypes.func,
  onChangeWordRate: PropTypes.func,
  onChangeRepeated: PropTypes.func,
  onStatsChanged: PropTypes.func,
  onShowTip: PropTypes.func,
  onChangeDifficulty: PropTypes.func,
  onChangeRemoved: PropTypes.func,
};

WordCard.defaultProps = {
  currentWord: {},
  isLogged: false,
  currentInput: '',
  progress: initialProgressObject,
  textExampleTranslate: '',
  textExample: {},
  isShownTranslation: true,
  wordCount: 0,
  totalWords: 0,
  isShownComplicatedButton: true,
  image: '',
  isShownAnswerButton: true,
  isShownImageAssociation: true,
  word: '',
  wordTranslate: '',
  transcription: '',
  textMeaning: {},
  textMeaningTranslate: '',
  isShownTranscription: true,
  isShownExampleSentence: true,
  isShownMeaning: true,
  onNextWord: () => {},
  onPrevWord: () => {},
  onChangeProgress: () => {},
  onPlayAudio: () => {},
  onChangeWordRate: () => {},
  onStatsChanged: () => {},
  onShowTip: () => {},
  onChangeDifficulty: () => {},
  onChangeRemoved: () => {},
};

export default WordCard;
