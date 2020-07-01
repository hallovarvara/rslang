import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import { withWordsService, withRecognitionService, withLocalStorageService } from '../hoc';
import {
  pagesCount, levelsCount, amountOfWordsOnOnePage, apiLinks,
} from './helpers/constants';
import HomePage from './components/pages/Home';
import GamePage from './components/pages/Game';
import CurrentResultsPage from './components/pages/CurrentResults';
import LatestResultsPage from './components/pages/LatestResults';

import playAudio from '../../../helpers/play_audio';

import correctAudioSrc from './assets/correct.mp3';

class App extends React.Component {
  state = {
    loading: true,
    starsCount: 0,
    currentLevel: 0,
    currentActiveWords: [],
    currentWords: [],
    isGameInProcess: false,
    recognitionResults: null,
    isUserWon: false,
  }

  levels = null

  recognitionService = this.props.recognitionService;

  localStorageService = this.props.localStorageService;

  componentDidMount() {
    const { wordsService } = this.props;
    wordsService.getAllWords(pagesCount, levelsCount)
      .then((allWords) => {
        this.levels = allWords;
        this.setState({
          loading: false,
          currentWords: this.generateCurrentWords(0),
        });
      });
    this.recognitionService.recognition.addEventListener('result', (event) => {
      this
        .recognitionService
        .onRecognitionResults(
          event, this.recognitionResultsChanged.bind(this),
        );
    });
  }

  generateCurrentWords = (level) => this.levels[level]
    .slice(0)
    .sort(() => Math.random() - 0.5)
    .slice(0, amountOfWordsOnOnePage)

  levelChanged = (level) => {
    this.setState({
      currentLevel: level,
      currentWords: this.generateCurrentWords(level),
    });
    this.abortGame();
  }

  currentActiveWordsChanged = (wordObj, isClicked) => {
    this.setState((state) => {
      const {
        currentActiveWords,
        isGameInProcess,
      } = state;
      let { starsCount } = state;
      let newActiveWords = currentActiveWords.slice(0);
      if (isGameInProcess && !currentActiveWords.includes(wordObj) && !isClicked) {
        newActiveWords.push(wordObj);
        starsCount += 1;
        playAudio(correctAudioSrc);
      } else if (!isGameInProcess && isClicked) {
        newActiveWords = [wordObj];
        playAudio(`${apiLinks.file}${wordObj.audio}`);
      }
      return {
        starsCount,
        currentActiveWords: newActiveWords,
      };
    });
  }

  startGame = () => {
    if (!this.state.isGameInProcess) {
      this.setState({
        isGameInProcess: true,
        currentActiveWords: [],
        recognitionResults: '',
        starsCount: 0,
      });
      this.recognitionService.recognition.addEventListener('end', this.recognitionService.recognition.start);
      this.recognitionService.recognition.start();
    }
  };

  abortGame = () => {
    this.setState((state) => {
      if (state.isGameInProcess && !state.isUserWon) {
        this.saveResults();
      }

      return {
        isGameInProcess: false,
        starsCount: 0,
        currentActiveWords: [],
        recognitionResults: null,
        isUserWon: false,
      };
    });
    this.recognitionService.recognition.removeEventListener('end', this.recognitionService.recognition.start);
    this.recognitionService.recognition.abort();
  }

  saveResults = () => {
    this.localStorageService.pushToLatestResults({
      date: (new Date()).toLocaleString('ru', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }),
      allWords: this.state.currentWords,
      guessedWords: this.state.currentActiveWords,
    });
  }

  userHasWon = () => {
    if (!this.state.isUserWon) {
      this.setState({
        isUserWon: true,
      });
      setTimeout(() => {
        this.props.history.push('/speakit/current-results');
      }, 1500);
      this.saveResults();
    }
  }

  recognitionResultsChanged = (results) => {
    const {
      currentActiveWords,
      currentWords,
    } = this.state;
    const guessedWordObj = currentWords
      .find((wordObj) => wordObj.word.toLowerCase() === results.toLowerCase());
    if (guessedWordObj !== undefined
        && !currentActiveWords.includes(guessedWordObj)) {
      this.currentActiveWordsChanged(guessedWordObj, false);
    }
    this.setState({
      recognitionResults: results,
    });
  }

  render() {
    const {
      loading,
      currentLevel,
      starsCount,
      recognitionResults,
      currentActiveWords,
      isGameInProcess,
      currentWords,
    } = this.state;

    return (
      <div className="speakit-game-container">
        <Switch>
          <Route path="/speakit/home" render={() => <HomePage loading={loading}/>} />
          <Route
            path="/speakit/game"
            render={() => (
              <GamePage
                loading={loading}
                levels={this.levels}
                currentLevel={currentLevel}
                starsCount={starsCount}
                recognitionResults={recognitionResults}
                currentActiveWords={currentActiveWords}
                isGameInProcess={isGameInProcess}
                currentWords={currentWords}
                levelChanged={this.levelChanged}
                currentActiveWordsChanged={this.currentActiveWordsChanged}
                abortGame={this.abortGame}
                startGame={this.startGame}
                userHasWon={this.userHasWon}
                 />
            )} />
          <Route
            path="/speakit/current-results"
            render={() => (
              <CurrentResultsPage
                isGameInProcess={isGameInProcess}
                currentLevel={currentLevel}
                levelChanged={this.levelChanged}
                loading={loading}
                currentWords={currentWords}
                currentActiveWords={currentActiveWords} />
            )} />
          <Route
            path="/speakit/latest-results"
            render={() => (
              <LatestResultsPage
                levelChanged={this.levelChanged}
                currentLevel={currentLevel} />
            )} />
            <Route render={() => <h2 style={{ paddingTop: '300px' }}>heeey</h2>} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  wordsService: PropTypes.object,
  recognitionService: PropTypes.object,
  localStorageService: PropTypes.object,
  history: PropTypes.object,
};

export default withLocalStorageService()(withRecognitionService()(withWordsService()(App)));
