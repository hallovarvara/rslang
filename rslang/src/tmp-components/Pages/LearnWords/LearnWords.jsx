import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Views/Header';
import WordCard from './Views/WordCard';
import * as settings from './helpers/settings';
import {
  extractEmphasizedWord,
  getSessionProgress,
  setSessionProgress,
  clearSessionProgress,
  checkSessionProgress,
  playAudios,
} from './helpers/helpers';

export default class LearnWords extends Component {
  state = {
    wordCount: 0,
    totalWords: 0,
    isAutoPlay: true,
    progress: [],
    isPlaying: false,
  };

  toggleAutoPlay = () => {
    const { isAutoPlay } = this.state;
    this.setState({
      isAutoPlay: !isAutoPlay,
    });
  }

  componentDidMount() {
    const { data } = this.props;
    const { totalWords } = this.state;
    const { initialProgressObject } = settings;
    let progress = getSessionProgress();
    if (totalWords === 0) {
      const { learnSessionProgress } = JSON.parse(localStorage.getItem('rslang'));
      if (learnSessionProgress.length) {
        progress = learnSessionProgress;
      } else {
        progress = new Array(data.length);
        progress.fill(initialProgressObject);
      }
      this.setState({
        totalWords: data.length,
        progress,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.progress !== prevState.progress) {
      const { progress } = this.state;
      setSessionProgress(progress);
      this.checkForEndOfGame();
    }
  }

  checkForEndOfGame = () => {
    const { progress, totalWords } = this.state;
    if (!checkSessionProgress(progress) && totalWords !== 0) {
      clearSessionProgress();
      // TODO: add modal pop-up with short stats
    }
  }

  playAudio = (audioName) => {
    const { data } = this.props;
    const { wordCount, isAutoPlay } = this.state;
    if (audioName) {
      playAudios(data[wordCount][audioName]);
    } else if (isAutoPlay) {
      const { audio, audioMeaning, audioExample } = data[wordCount];
      playAudios([audio, audioMeaning, audioExample]);
    }
  }

  handleNextWord = () => {
    const { data } = this.props;
    const { wordCount } = this.state;
    if (wordCount + 1 === data.length) {
      this.handleEndOfCards();
    } else {
      this.setState({
        wordCount: wordCount + 1,
      });
    }
  }

  handlePrevWord = () => {
    const { wordCount } = this.state;
    if (wordCount !== 0) {
      this.setState({
        wordCount: wordCount - 1,
      });
    }
  }

  handleChangeProgress = (updated) => {
    const { progress, wordCount } = this.state;
    this.setState({
      progress: progress.map((el, i) => (i === wordCount ? { ...el, ...updated } : el)),
    });
  }

  handleEndOfCards = () => {
    // TODO: maube here will be nice to add some info pop up
    console.log('end of cards');
  }

  render() {
    const { data } = this.props;
    const {
      wordCount,
      totalWords,
      progress,
      currentInput,
    } = this.state;
    const currentWord = data[wordCount];
    const {
      textExample,
      textExampleTranslate,
      image,
      word,
      wordTranslate,
      transcription,
      textMeaning,
      textMeaningTranslate,
    } = currentWord;
    const {
      isShownComplicatedButton,
      isShownAnswerButton,
      isShownImageAssociation,
      isShownTranslation,
      isShownTranscription,
      isShownExampleSentence,
      isShownMeaning,
      categoriesSelect,
    } = settings;
    const textExampleSentence = extractEmphasizedWord(textExample, 'b');
    const textMeaningSentence = extractEmphasizedWord(textMeaning, 'i');
    return (
      <div>
        <Header categoriesSelect={categoriesSelect} />
        <WordCard
          currentInput={currentInput}
          progress={progress[wordCount]}
          wordCount={wordCount + 1}
          totalWords={totalWords}
          textExample={textExampleSentence}
          textExampleTranslate={textExampleTranslate}
          image={image}
          word={word}
          wordTranslate={wordTranslate}
          transcription={transcription}
          textMeaning={textMeaningSentence}
          textMeaningTranslate={textMeaningTranslate}
          isShownComplicatedButton={isShownComplicatedButton}
          isShownAnswerButton={isShownAnswerButton}
          isShownImageAssociation={isShownImageAssociation}
          isShownTranslation={isShownTranslation}
          isShownTranscription={isShownTranscription}
          isShownExampleSentence={isShownExampleSentence}
          isShownMeaning={isShownMeaning}
          onNextWord={this.handleNextWord}
          onPrevWord={this.handlePrevWord}
          onChangeProgress={this.handleChangeProgress}
          onPlayAudio={this.playAudio}
        />
      </div>
    );
  }
}

LearnWords.propTypes = {
  data: PropTypes.array,
};

LearnWords.defaultProps = {
  data: [],
};