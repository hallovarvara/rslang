import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import { withWordsService, withRecognitionService, withLocalStorageService } from '../hoc';
import {
  pagesCount, levelsCount,
  amountOfWordsOnOnePage, apiLinks,
} from './helpers/constants';
import HomePage from './components/pages/Home';
import GamePage from './components/pages/Game';
import CurrentResultsPage from './components/pages/CurrentResults';
import LatestResultsPage from './components/pages/LatestResults';

import { playAudio } from '../../../helpers/functions';
import { soundSuccess } from '../../../helpers/constants';

class App extends React.Component {
  state = {
    loading: true,
    starsCount: 0,
    currentLevel: 0,
    currentPage: 0,
    currentActiveWords: [],
    currentWords: [],
    isGameInProcess: false,
    recognitionResults: null,
    isUserWon: false,
  }

  allWords = null

  recognitionService = this.props.recognitionService;

  localStorageService = this.props.localStorageService;

  componentDidMount() {
    const { wordsService } = this.props;
    wordsService.getAllWords(pagesCount, levelsCount)
      .then((allWords) => {
        this.allWords = allWords;
        this.setState((state) => ({
          loading: false,
          currentWords: this.generateCurrentWords(
            state.currentLevel, state.currentPage,
          ),
        }));
      });
    this.recognitionService.recognition.addEventListener('result', (event) => {
      this
        .recognitionService
        .onRecognitionResults(
          event, this.recognitionResultsChanged.bind(this),
        );
    });
  }

  startRecognition = () => {
    this.recognitionService.recognition.addEventListener('end', this.recognitionService.recognition.start);
    this.recognitionService.recognition.start();
  }

  abortRecognition = () => {
    this.recognitionService.recognition.removeEventListener('end', this.recognitionService.recognition.start);
    this.recognitionService.recognition.abort();
  }

  generateCurrentWords = (level, page) => this.allWords[level][page]
    .slice(0)
    .sort(() => Math.random() - 0.5)
    .slice(0, amountOfWordsOnOnePage)

  levelChanged = (level) => {
    this.setState((state) => ({
      currentLevel: level,
      currentWords: this.generateCurrentWords(
        level, state.currentPage,
      ),
    }));
  }

  pageChanged = (page) => {
    this.setState((state) => ({
      currentPage: page,
      currentWords: this.generateCurrentWords(
        state.currentLevel, page,
      ),
    }));
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
        playAudio(soundSuccess);
      } else if (!isGameInProcess && isClicked) {
        newActiveWords = [wordObj];
        playAudio(apiLinks.file + wordObj.audio);
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
      this.startRecognition();
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
    this.abortRecognition();
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
      this.saveResults();
      this.props.history.push('/speakit/current-results');
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
      currentPage,
      starsCount,
      recognitionResults,
      currentActiveWords,
      isGameInProcess,
      currentWords,
    } = this.state;

    return (
      <div className="speakit-game-container">
        <Switch>
          <Route path="/speakit/home" render={() => (
            <HomePage
              loading={loading}
              currentLevel={currentLevel}
              currentPage={currentPage}
              levelChanged={this.levelChanged}
              pageChanged={this.pageChanged}/>
          )} />
          <Route
            path="/speakit/game"
            render={() => (
              <GamePage
                startRecognition={this.startRecognition}
                abortRecognition={this.abortRecognition}
                loading={loading}
                allWords={this.allWords}
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
                abortGame={this.abortGame}
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
                abortGame={this.abortGame}
                loading={loading}
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
