import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Views/Header';
import WordCard from './Views/WordCard';
import StartView from './Views/StartView';
import Preloader from '../../../basicComponents/Preloader';
import ShortStats from './Views/ShortStats';
import response from './helpers/response.json';
import * as settings from './helpers/settings';
import { wordBaseTemplate, initialState } from './helpers/constants';
import {
  extractEmphasizedWord,
  getSessionProgress,
  setSessionProgress,
  checkSessionProgress,
  playAudios,
} from './helpers';
import {
  updateLearnWordsRate,
  updateUserWordRepeated,
  updateUserWordDifficulty,
  updateUserWordRemoved,
} from '../../../helpers/wordsService';
import {
  localStorageItems,
  levelsOfDifficulty,
} from '../../../helpers/constants';
import { clearSessionData } from '../../../helpers/wordsService/storageModel';

export default class LearnWords extends Component {
  state = initialState;

  handleStatsChanged = (isUserGuesse) => {
    if (isUserGuesse) {
      this.setState((state) => ({
        guessedCount: state.guessedCount + 1,
        statsRightAnswerSeries: state.statsRightAnswerSeries + 1,
      }));
    } else {
      this.setState((state) => ({
        statsMistakesCount: state.statsMistakesCount + 1,
        statsRightAnswerSeries: 0,
      }));
    }
  }

  componentDidMount() {
    const learnSessionProgress = getSessionProgress();
    if (learnSessionProgress) {
      this.setState({
        totalWords: learnSessionProgress.length,
        words: learnSessionProgress,
        wordCount: learnSessionProgress.findIndex((el) => !el.progress.isDifficultChosen),
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
    if (this.state.words !== prevState.words) {
      const { words } = this.state;
      setSessionProgress(words);
      // this.checkForEndOfGame();
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
    const {
      words,
      totalWords,
      isFirstPassDone,
      isSecondPastDone,
    } = this.state;
    if (!checkSessionProgress(words) && totalWords) {
      if (!isFirstPassDone) {
        this.secondRepeat();
      } else if (!isSecondPastDone) {
        this.thirdRepeat();
      } else {
        this.setState({
          isShownShortStats: true,
        });
      }
    }
  }

  secondRepeat = () => {
    const { initialProgressObject } = settings;
    const words = getSessionProgress();
    const secondSet = words.filter(
      (el) => el.progress.secondRepeat && !el.userWord.optional.removed,
    );
    const updated = secondSet.map((el) => ({ ...el, progress: { ...initialProgressObject } }));
    this.setState({
      words: updated,
      totalWords: updated.length,
      wordCount: 0,
      guessedCount: 0,
      isFirstPassDone: true,
    });
  }

  thirdRepeat = () => {
    const { initialProgressObject } = settings;
    const words = getSessionProgress();
    const secondSet = words.filter(
      (el) => el.progress.thirdRepeat && !el.userWord.optional.removed,
    );
    const updated = secondSet.map((el) => ({
      ...el,
      progress: { ...initialProgressObject },
    }));
    this.setState({
      words: updated,
      totalWords: updated.length,
      wordCount: 0,
      guessedCount: 0,
    });
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

  handleShowTip = () => {
    const { words, wordCount } = this.state;
    const wordObject = words[wordCount];
    wordObject.progress.secondRepeat = true;
    wordObject.progress.isGuessed = true;
    wordObject.progress.isShownWord = true;
    wordObject.progress.isUsedTip = true;
    this.updateUserWordInState(wordObject);
  }

  handleChangeWordRate = (level) => {
    const { words, wordCount } = this.state;
    const wordObject = words[wordCount];
    const updated = updateLearnWordsRate(wordObject, level);
    if (level === levelsOfDifficulty.HARD) {
      updated.progress.secondRepeat = true;
      updated.progress.thirdRepeat = true;
    } else if (level === levelsOfDifficulty.NORMAL) {
      updated.progress.secondRepeat = true;
    }
    this.updateUserWordInState(updated);
  }

  handleChangeInWord = (modifyingFunction) => {
    const { words, wordCount } = this.state;
    const wordObject = words[wordCount];
    const updated = modifyingFunction(wordObject);
    this.updateUserWordInState(updated);
  }

  handleChangeRepeated = () => {
    this.handleChangeInWord(updateUserWordRepeated);
  }

  handleChangeDifficulty = () => {
    this.handleChangeInWord(updateUserWordDifficulty);
  }

  handleChangeRemoved = () => {
    this.handleChangeInWord(updateUserWordRemoved);
  }

  handleChangeProgress = (updated) => {
    const { words, wordCount } = this.state;
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
    this.toggleStartLearning();
    clearSessionData();
    const wordsFromApiResponse = this.getDataFromApi();
    const words = this.prepareSessionProgress(wordsFromApiResponse);
    const statsNewWordsCount = words.filter((el) => !el.userWord).length;
    setSessionProgress(words);
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
      isShownShortStats,
      statsNewWordsCount,
      statsMistakesCount,
      statsRightAnswerSeries,
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
      <div className='learn-words'>
        {isShownShortStats && !isFetching && (
          <ShortStats
            totalWords={totalWords}
            mistakes={words.filter(
              (el) => el.progress.thirdRepeat || el.progress.secondRepeat,
            ).length}
            statsNewWordsCount={statsNewWordsCount}
            statsMistakesCount={statsMistakesCount}
            statsRightAnswerSeries={statsRightAnswerSeries}
          />
        )}
        {isFetching && <Preloader />}
        {!isFetching && (
          <>
            <Header
              categoriesSelect={categoriesSelect}
              onToggleAutoPlay={this.toggleAutoPlay}
              onToggleCategory={this.toggleCategory}
            />
            <WordCard
              onChangeRemoved={this.handleChangeRemoved}
              onChangeDifficulty={this.handleChangeDifficulty}
              onShowTip={this.handleShowTip}
              onStatsChanged={this.handleStatsChanged}
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
