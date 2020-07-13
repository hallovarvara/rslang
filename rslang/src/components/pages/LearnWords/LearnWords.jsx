import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Views/Header';
import WordCard from './Views/WordCard';
import StartView from './Views/StartView';
import Preloader from '../../../basicComponents/Preloader';
import response from './helpers/response.json';
import * as settings from './helpers/settings';
import { wordBaseTemplate } from './helpers/constants';
import {
  extractEmphasizedWord,
  getSessionProgress,
  setSessionProgress,
  clearSessionProgress,
  checkSessionProgress,
  playAudios,
} from './helpers';
import {
  updateLearnWordsRate,
  updateUserWordRepeated,
  updateUserWordDifficulty,
  updateUserWordRemoved,
} from '../../../helpers/wordsService';
import { localStorageItems } from '../../../helpers/constants';

export default class LearnWords extends Component {
  state = {
    wordCount: 0,
    totalWords: 0,
    isAutoPlay: true,
    words: [],
    progress: [],
    isLogged: false,
    token: '',
    userId: '',
    audio: null,
    isFetching: false,
    category: 'all',
    isFirstPassDone: false,
    isStartLearning: false,
    statsNewWordsCount: 0,
    statsMistakesCount: 0,
    statsRightAnswerSeries: 0,
  };

  componentDidMount() {
    const learnSessionProgress = getSessionProgress();
    if (learnSessionProgress) {
      this.setState({
        totalWords: learnSessionProgress.length,
        words: learnSessionProgress,
      });
    }
    this.checkForLoggedUser();
  }

  prepareSessionProgress = (arrayOfWords) => {
    const { initialProgressObject } = settings;
    return arrayOfWords.map((el) => ({
      ...el,
      progress: { ...initialProgressObject },
    }));
  };

  fakeApi = () => (
    // setTimeout(() => response, 1500)
    response
  );

  getDataFromApi = () => {
    this.setState((state) => ({
      isFetching: !state.isFetching,
    }));
    return this.fakeApi();
  };

  toggleAutoPlay = () => {
    this.setState((state) => ({
      isAutoPlay: !state.isAutoPlay,
    }));
  }

  toggleCategory = ({ target: { value } }) => {
    this.setState({
      category: value,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // const { wordCount } = this.state;
    console.log('update state');
    if (this.state.words !== prevState.words) {
      console.log('if inside');
      const { words } = this.state;
      setSessionProgress(words);
      this.checkForEndOfGame();
    }
  }

  toggleCategory = ({ target: { value } }) => {
    this.setState({
      category: value,
    });
  }

  checkForLoggedUser = () => {
    if (localStorage?.rslangUserId) {
      const userId = localStorage.getItem(localStorageItems.userId);
      const token = localStorage.getItem(localStorageItems.token);
      this.setState({
        isLogged: true,
        token,
        userId,
      });
    }
  }

  checkForEndOfGame = () => {
    const { progress, totalWords } = this.state;
    if (!checkSessionProgress(progress) && totalWords) {
      // clearSessionProgress();
      // TODO: add modal pop-up with short stats
    }
  }

  playAudio = (audioName) => {
    const { wordCount, isAutoPlay, words } = this.state;
    if (audioName) {
      playAudios(words[wordCount][audioName]);
    } else if (isAutoPlay) {
      const { audio, audioMeaning, audioExample } = words[wordCount];
      playAudios([audio, audioMeaning, audioExample]);
    }
  }

  handleNextWord = () => {
    this.setState((state) => (
      {
        wordCount: state.wordCount === state.words.length - 1 ? 0 : state.wordCount + 1,
      }
    ));
  }

  handlePrevWord = () => {
    this.setState((state) => (
      {
        wordCount: !state.wordCount ? state.words.length - 1 : state.wordCount - 1,
      }
    ));
  }

  updateUserWordInState = (wordObject) => {
    this.setState((state) => ({
      words: state.words.map((el) => (el.id === wordObject.id ? wordObject : el)),
    }));
  }

  handleChangeWordRate = (level) => {
    const { words, wordCount } = this.state;
    const wordObject = words[wordCount];
    const updated = updateLearnWordsRate(wordObject, level);
    this.updateUserWordInState(updated);
  }

  handleChangeRepeated = () => {
    const { words, wordCount } = this.state;
    const wordObject = words[wordCount];
    const updated = updateUserWordRepeated(wordObject);
    this.updateUserWordInState(updated);
  }

  handleChangeProgress = (updated) => {
    const { words, wordCount } = this.state;
    console.log(words);
    const { initialProgressObject } = settings;
    this.setState({
      words: words.map((el, i) => (i === wordCount
        ? {
          ...el,
          progress: {
            ...(el?.progress || initialProgressObject),
            ...updated,
          },
        }
        : el)),
    });
  }

  handleContinueLearning = () => {
    this.toggleStartLearning();
    const words = getSessionProgress();
    this.setState({
      words,
    });
  }

  handleStartNewLearning = () => {
    console.log('handleStartNewLearning');
    this.toggleStartLearning();
    const wordsFromApiResponse = this.getDataFromApi();
    const words = this.prepareSessionProgress(wordsFromApiResponse);
    const statsNewWordsCount = words.filter((el) => !el.userWord).length;
    setSessionProgress(words);
    console.log(words);
    this.setState((state) => (
      {
        words,
        statsNewWordsCount,
        totalWords: words.length,
        isFetching: !state.isFetching,
      }
    ));
  }

  toggleStartLearning = () => {
    this.setState((state) => (
      {
        isStartLearning: !state.isStartLearning,
      }
    ));
  }

  handleEndOfCards = () => {
    // TODO: maube here will be nice to add some info pop up
    console.log('end of cards');
  }

  render() {
    const {
      words,
      wordCount,
      totalWords,
      currentInput,
      isLogged,
      isFirstPassDone,
      isStartLearning,
      isFetching,
    } = this.state;
    const currentWord = words[wordCount] || wordBaseTemplate;
    const { progress } = currentWord;
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
    const output = !isStartLearning ? (
      <StartView
        onContinueLearning={this.handleContinueLearning}
        onStartNewLearning={this.handleStartNewLearning}
        isContinued={Boolean(words.length)}
      />
    ) : (
      <div>
        {isFetching && <Preloader />}
        {!isFetching && (
          <>
            <Header
              categoriesSelect={categoriesSelect}
              onToggleAutoPlay={this.toggleAutoPlay}
              onToggleCategory={this.toggleCategory}
            />
            <WordCard
              onChangeRepeated={this.handleChangeRepeated}
              onChangeWordRate={this.handleChangeWordRate}
              isFirstPassDone={isFirstPassDone}
              currentWord={currentWord}
              isLogged={isLogged}
              currentInput={currentInput}
              progress={progress}
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
          </>
        )}
      </div>
    );
    return <>{output}</>;
  }
}

LearnWords.propTypes = {
  data: PropTypes.array,
};

LearnWords.defaultProps = {
  data: [],
};
