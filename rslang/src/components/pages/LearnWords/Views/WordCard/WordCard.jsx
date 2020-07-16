import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from '../StatusBar';
import SideBar from '../SideBar';
import Word from '../Word';
import WordExtraInfo from '../WordExtraInfo';
import SpacingRepeating from '../SpacingRepeating';
import { initialProgressObject } from '../../helpers/settings';

import LinearProgress from '../../../../../basicComponents/LinearProgress';

import { showDifferenceInWords, resourceUrl } from '../../helpers';
import { buttonsNames } from '../../helpers/constants';

import questionBg from '../../../../../assets/images/question-bg.jpg';

class WordCard extends React.Component {
  state = {
    value: '',
  }

  handleInput = ({ target: { value } }) => {
    this.setState({ value });
    const {
      onChangeProgress,
      progress: { difference },
    } = this.props;
    if (value && difference) {
      onChangeProgress({ isShownWord: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const currentWord = this.props.textExample.emphasis;
    const inputWord = this.state.value;
    if (currentWord !== inputWord) {
      this.handleError(currentWord, inputWord);
    } else {
      this.handleSuccess();
    }
    this.setState({
      value: '',
    });
  };

  handleError = (currentWord, inputWord) => {
    const { onChangeProgress, onStatsChanged } = this.props;
    const difference = showDifferenceInWords(currentWord, inputWord);
    onChangeProgress({ isShownWord: true, difference });
    onStatsChanged(false);
    setTimeout(() => {
      onChangeProgress({ isWordSemiOpacity: true });
    }, 2000);
  };

  handleSuccess = () => {
    const { onChangeProgress, onPlayAudio, onStatsChanged } = this.props;
    onChangeProgress({
      isGuessed: true,
      isShownWord: true,
      difference: null,
    });
    onStatsChanged(true);
    onPlayAudio();
  };

  render() {
    const {
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
    } = this.props;
    return (
      <div className="learn-word-card-wrapper">
        <LinearProgress
          done={wordCount}
          all={totalWords}/>
        <div className="learn-word-card">
          <div id="fuck" className="learn-word-card-info">
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
              handleSubmit={this.handleSubmit}
              handleInput={this.handleInput}
              value={this.state.value}
            />
            <div className="line learn-word-card-info__line"></div>
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
          <div style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${isShownImageAssociation ? resourceUrl(image) : questionBg})`,
          }} className="learn-word-card-control">
            <SideBar
              progress={progress}
              currentInput={currentInput}
              word={word}
              isShownAnswerButton={isShownAnswerButton}
              onNextWord={onNextWord}
              onPrevWord={onPrevWord}
              onShowTip={onShowTip}
            />
          </div>
        </div>
        <button className="learn-word-card-info__check-answer" disabled={!this.state.value} onClick={this.handleSubmit}>
          {buttonsNames.CHECK_ANSWER}
        </button>
      </div>
    );
  }
}

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
