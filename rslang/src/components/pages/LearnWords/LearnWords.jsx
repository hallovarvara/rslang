import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Views/Header';
import WordCard from './Views/WordCard';
import StartView from './Views/StartView';
import Preloader from '../../../basicComponents/Preloader';
import ShortStats from './Views/ShortStats';
import * as settings from './helpers/settings';
import { wordBaseTemplate, initialState } from './helpers/constants';
import {
  extractEmphasizedWord,
  getSessionProgress,
  setSessionProgress,
  checkSessionProgress,
  audioplayer,
} from './helpers';
import {
  updateLearnWordsRate,
  updateUserWordRepeated,
  updateUserWordDifficulty,
  updateUserWordRemoved,
  handleGameRightAnswer,
  handleGameWrongAnswer,
  prepareSessionInfoToServer,
  saveSessionInfoToLocal,
} from '../../../helpers/wordsService';
import {
  localStorageItems,
  levelsOfDifficulty,
  applicationThings,
} from '../../../helpers/constants';
import { clearSessionData } from '../../../helpers/wordsService/storageModel';
import { statsTemplate, changeStats } from '../../../helpers/wordsService/statsModel';
import UserService from '../../../helpers/userService';
import { getWordsByAmount } from '../../../helpers/wordsService/wordsApi';

const userservice = new UserService();

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
    userservice.firstEnterOfUser();
    const learnSessionProgress = getSessionProgress();
    if (learnSessionProgress.length) {
      const { isLogged, token, userId } = this.checkForLoggedUser();
      this.setState({
        totalWords: learnSessionProgress.length,
        words: learnSessionProgress,
        wordCount: learnSessionProgress.findIndex(
          (el) => !el.progress.isDifficultChosen,
        ),
        isLogged,
        token,
        userId,
      });
    }
  }

  prepareSessionProgress = (arrayOfWords) => {
    const { initialProgressObject } = settings;
    return arrayOfWords.map((el) => ({
      ...el,
      progress: { ...initialProgressObject },
    }));
  };

  getDataFromApi = () => {
    this.setState((state) => ({
      isFetching: !state.isFetching,
    }));
    return getWordsByAmount(1, 10);
  };

  toggleAutoPlay = () => {
    audioplayer.stopAudios();
    this.setState((state) => ({
      isAutoPlay: !state.isAutoPlay,
    }));
  }

  toggleCategory = ({ target: { value } }) => {
    this.setState({
      category: value,
    });
  }

  checkForLoggedUser = () => {
    const result = { isLogged: false, token: '', userId: '' };
    if (localStorage?.rslangUserId) {
      result.userId = localStorage.getItem(localStorageItems.userId);
      result.token = localStorage.getItem(localStorageItems.token);
      result.isLogged = true;
    }
    return { ...result };
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
        userservice.handleEndOfGame();
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

  playAudios = (audioName) => {
    const { wordCount, isAutoPlay, words } = this.state;
    if (audioName) {
      audioplayer.playAudios(words[wordCount][audioName]);
    } else if (isAutoPlay) {
      const { audio, audioMeaning, audioExample } = words[wordCount];
      audioplayer.playAudios([audio, audioMeaning, audioExample]);
    }
  }

  handleNextWord = () => {
    audioplayer.stopAudios();
    this.setState((state) => (
      {
        wordCount: state.wordCount === state.words.length - 1 ? 0 : state.wordCount + 1,
      }
    ));
  }

  handlePrevWord = () => {
    audioplayer.stopAudios();
    this.setState((state) => (
      {
        wordCount: !state.wordCount ? state.words.length - 1 : state.wordCount - 1,
      }
    ));
  }

  updateUserWordInState = (wordObject) => {
    this.setState((state) => ({
      words: state.words.map((el) => (el.id === wordObject?.id ? wordObject : el)),
    }));
    const { words } = this.state;
    setSessionProgress(words);
    this.checkForEndOfGame();
  }

  handleShowTip = () => {
    const { words, wordCount } = this.state;
    const wordObject = { ...words[wordCount] };
    wordObject.progress.secondRepeat = true;
    wordObject.progress.isGuessed = true;
    wordObject.progress.isShownWord = true;
    wordObject.progress.isUsedTip = true;
    wordObject.progress.difference = null;
    this.setState((state) => ({
      words: state.words.map((el) => (el.id === wordObject?.id ? wordObject : el)),
      statsMistakesCount: state.statsMistakesCount + 1,
    }));
  }

  handleChangeWordRate = (level, updatedProgress) => {
    let progress;
    const { words, wordCount } = this.state;
    const wordObject = { ...words[wordCount] };
    const updated = updateLearnWordsRate(wordObject, level);
    if (level === levelsOfDifficulty.HARD) {
      updated.progress.secondRepeat = true;
      updated.progress.thirdRepeat = true;
    } else if (level === levelsOfDifficulty.NORMAL) {
      updated.progress.secondRepeat = true;
    }
    if (updatedProgress) {
      const { initialProgressObject } = settings;
      progress = {
        ...(wordObject?.progress || initialProgressObject),
        ...updatedProgress,
      };
    }
    this.updateUserWordInState({ ...updated, progress: { ...progress } });
  }

  handleChangeInWord = (modifyingFunction) => {
    const { words, wordCount } = this.state;
    const wordObject = { ...words[wordCount] };
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
    const words = getSessionProgress();
    this.setState((state) => (
      {
        words,
        isStartLearning: !state.isStartLearning,
      }
    ));
  }

  handleStartNewLearning = async () => {
    this.togglePreloader();
    clearSessionData();
    const { isWordsRandomly, userLevel } = this.state;
    const group = isWordsRandomly ? null : userLevel;
    const wordsFromApiResponse = await userservice.prepareToLearnWords(
      20,
      group,
    );
    // const wordsFromApiResponse = await getWordsByAmount(1, 10);
    const words = await this.prepareSessionProgress(wordsFromApiResponse);
    if (words[0]?.word) {
      const statsNewWordsCount = words.filter((el) => !el.userWord).length;
      setSessionProgress(words);
      this.setState((state) => (
        {
          words,
          statsNewWordsCount,
          totalWords: words.length,
          isStartLearning: !state.isStartLearning,
        }
      ));
      setTimeout(() => {
        this.togglePreloader();
      }, 1500);
    }
  }

  togglePreloader = () => {
    this.setState((state) => ({
      isFetching: !state.isFetching,
    }));
  }

  setWordsRandomly = (wordsRandomly) => {
    this.setState({
      isWordsRandomly: wordsRandomly,
    });
  }

  setUserLevel = (level) => {
    this.setState({
      userLevel: level,
    });
  }

  setUserPage = (page) => {
    this.setState({
      userPage: page,
    });
  }

  setUser

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
      isWordsRandomly,
      userPage,
      userLevel,
    } = this.state;
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
    // const currentWord = words[wordCount && wordCount + 1] || wordBaseTemplate;
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
    const textExampleSentence = extractEmphasizedWord(textExample, 'b');
    const textMeaningSentence = extractEmphasizedWord(textMeaning, 'i');
    const output = !isStartLearning ? (
      <StartView
        onContinueLearning={this.handleContinueLearning}
        onStartNewLearning={this.handleStartNewLearning}
        isContinued={Boolean(words.length)}
        setWordsRandomly={this.setWordsRandomly}
        setUserLevel={this.setUserLevel}
        setUserPage={this.setUserPage}
        isWordsRandomly={isWordsRandomly}
        userPage={userPage}
        userLevel={userLevel}
      />
    ) : (
      <div className="learn-words">
        {isShownShortStats && !isFetching && (
          <ShortStats
            totalWords={totalWords}
            mistakes={
              words.filter(
                (el) => el.progress.thirdRepeat || el.progress.secondRepeat,
              ).length
            }
            statsNewWordsCount={statsNewWordsCount}
            statsMistakesCount={statsMistakesCount}
            statsRightAnswerSeries={statsRightAnswerSeries}
          />
        )}
        {isFetching && <Preloader />}
        {!isFetching && words.length && (
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
              onPlayAudio={this.playAudios}
            />
            <button onClick={() => this.setState({ isFirstPassDone: true })}>
              Test
            </button>
            <button
              onClick={
                () => handleGameRightAnswer(applicationThings.SAVANNAH, currentWord)
              }
            >
              game right
            </button>
            <button
              onClick={
                () => handleGameWrongAnswer(applicationThings.SAVANNAH, currentWord)
              }
            >
              game wrong
            </button>
            <button
              onClick={() => {
                const stats = JSON.parse(localStorage.rslangUserStatistics);
                console.log(
                  prepareSessionInfoToServer(
                    applicationThings.LEARN_WORDS,
                    stats,
                  ),
                );
              }}
            >
              prepare
            </button>
            <button
              onClick={
                () => saveSessionInfoToLocal(applicationThings.LEARN_WORDS)
              }
            >
              save
            </button>
            <button
              onClick={
                () => console.log(
                  changeStats(
                    applicationThings.SAVANNAH,
                    { games: 1, wrong: 4, right: 9 },
                    statsTemplate,
                  ),
                )
              }
            >
              update stats
            </button>
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
