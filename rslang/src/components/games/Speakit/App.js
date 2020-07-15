import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withWordsService, withRecognitionService, withLocalStorageService } from '../hoc';
import {
  pagesCount, levelsCount,
  amountOfWordsOnOnePage, apiLinks,
} from './helpers/constants';

import Notification from '../../../basicComponents/Notification';
import HomePage from './components/pages/Home';
import GamePage from './components/pages/Game';
import CurrentResultsPage from './components/pages/CurrentResults';
import LatestResultsPage from './components/pages/LatestResults';

import { playAudio } from '../../../helpers/functions';
import { soundSuccess, text } from '../../../helpers/constants';
import UserService from '../../../helpers/userService';

const shuffleArray = (words) => (
  words
    .slice()
    .sort(() => Math.random() - 0.5)
    .map((wordObj) => ({ ...wordObj }))
);

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
    useUserWords: true,
    notifications: [],
  }

  allWords = null

  recognitionService = this.props.recognitionService;

  localStorageService = this.props.localStorageService;

  componentDidMount() {
    this.userService = new UserService();
    this.userId = this.props.userId;
    this.setState({ useUserWords: Boolean(this.userId) });
    const { wordsService } = this.props;
    console.log(this.userId);

    const requests = [wordsService.getAllWords(pagesCount, levelsCount)];
    if (this.userId) {
      console.log('heeey');
      requests.push(this.userService.getUserWordsNoRemoved(this.userId));
    }

    Promise.all(requests)
      .then(([allWords, userWords]) => {
        this.allWords = allWords;
        console.log('USER WORDS ', userWords);
        this.userWords = shuffleArray(userWords || []);
        const { currentLevel, currentPage } = this.state;
        const currentWords = this.generateCurrentWords(currentLevel, currentPage);
        console.log('CURRENT WORDS: ', currentWords);
        this.setState({
          loading: false,
          currentWords,
        });
      })
      .catch((error) => {
        console.log('BACKEND CRASHED ', error);
        this.showNotifications([{
          type: 'error',
          message: text.ru.backendCrashed,
        }]);
      });
    this.recognitionService.recognition.addEventListener('result', (event) => {
      this
        .recognitionService
        .onRecognitionResults(
          event, this.recognitionResultsChanged.bind(this),
        );
    });
  }

  setUsingOfUserWords = (useUserWords) => {
    const currentWords = this.generateCurrentWords(
      this.state.currentLevel,
      this.state.currentPage,
      useUserWords,
    );
    this.setState({
      useUserWords,
      currentWords,
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

  generateCurrentWords = (currentLevel, currentPage, useUserWords = this.state.useUserWords) => (
    [
      ...shuffleArray(useUserWords ? this.userWords : []),
      ...shuffleArray(this.allWords[currentLevel][currentPage]),
    ].slice(0, amountOfWordsOnOnePage)
  )

  levelChanged = (level) => {
    const currentWords = this.generateCurrentWords(level, this.state.currentPage);
    this.setState({
      currentLevel: level,
      currentWords,
    });
  }

  pageChanged = (page) => {
    const currentWords = this.generateCurrentWords(this.state.currentLevel, page);
    this.setState({
      currentPage: page,
      currentWords,
    });
  }

  showNotifications = (notifications) => {
    this.setState({
      notifications,
    });
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
      useUserWords,
    } = this.state;

    return (
      <div className="speakit-game-container">
        <Switch>
          <Route path="/speakit/home" render={() => (
            <HomePage
              setUsingOfUserWords={this.setUsingOfUserWords}
              showNotifications={this.showNotifications}
              isUserLogged={Boolean(this.userId)}
              useUserWords={useUserWords}
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
        {
          this.state.notifications.map((notif, index) => (
            <Notification
              key={index}
              variant={notif.type}
              message={notif.message}
              afterClose={() => this.showNotifications([])}
            />
          ))
        }
      </div>
    );
  }
}

App.propTypes = {
  wordsService: PropTypes.object,
  recognitionService: PropTypes.object,
  localStorageService: PropTypes.object,
  history: PropTypes.object,
  userId: PropTypes.string,
};

const mapStateToProps = (store) => ({
  userId: store.auth.userId,
});

export default withLocalStorageService()(
  withRecognitionService()(
    withWordsService()(
      connect(mapStateToProps)(App),
    ),
  ),
);
