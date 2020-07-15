import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import Notification from '../../../basicComponents/Notification';

import StartPage from './components/pages/Start';
import GamePage from './components/pages/Game';
import ResultsPage from './components/pages/Results';
import LatestResultsPage from './components/pages/LatestResults';

import { withWordsService } from '../hoc';
import UserService from '../../../helpers/userService';

import {
  pagesCount,
  levelsCount,
  wordsPerPage,
  localStorageItems,
} from './helpers/contants';

import {
  soundSuccess,
  soundError,
  text,
} from '../../../helpers/constants';
import { playAudio } from '../../../helpers/functions';

// const getRandomWords = (words) => (
//   words
//     .sort(() => Math.random() - 0.5)
//     .slice(0, wordsPerPage)
//     .map((obj) => ({ ...obj, attempt: null, hideDefinition: true }))
// );

// const getShuffledWords = (words) => (
//   words
//     .slice()
//     .sort(() => Math.random() - 0.5)
//     .map((wordObj) => ({ ...wordObj }))
// );

const shuffleArray = (words) => (
  words
    .slice()
    .sort(() => Math.random() - 0.5)
    .map((wordObj) => ({ ...wordObj, attempt: null, hideDefinition: true }))
);

const replaceElInArrayOfObject = (array, object, newProps) => {
  const indexOfObject = array.findIndex((wordObj) => (
    wordObj.id === object.id
  ));

  return [
    ...array.slice(0, indexOfObject),
    { ...object, ...newProps },
    ...array.slice(indexOfObject + 1),
  ].map((wordObj) => ({ ...wordObj }));
};

class App extends React.Component {
  state = {
    currentLevel: 0,
    currentPage: 0,
    loading: true,
    currentWords: null,
    shuffledCurrentWords: null,
    repeatingWords: null,
    newWords: null,
    useUserWords: true,
    notifications: [],
  }

  allWords = null;

  componentDidMount() {
    this.userService = new UserService();
    this.userId = this.props.userId;
    this.setState({ useUserWords: Boolean(this.userId) });

    console.log('USER ID ', this.userId);

    if (localStorage.getItem(localStorageItems.latestResults) === null) {
      localStorage.setItem(localStorageItems.latestResults, JSON.stringify([]));
    }

    const { wordsService } = this.props;
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
        const shuffledCurrentWords = shuffleArray(currentWords);
        console.log('CURRENT WORDS: ', currentWords);
        console.log('SHUFFLED CURRENT WORDS: ', shuffledCurrentWords);
        this.setState({
          loading: false,
          currentWords,
          shuffledCurrentWords,
        });
      })
      .catch((error) => {
        console.log('BACKEND CRASHED ', error);
        this.showNotifications([{
          type: 'error',
          message: text.ru.backendCrashed,
        }]);
      });
  }

  generateCurrentWords = (currentLevel, currentPage) => (
    [
      ...shuffleArray(this.state.useUserWords ? this.userWords : []),
      ...shuffleArray(this.allWords[currentLevel][currentPage]),
    ].slice(0, wordsPerPage)
  )

  levelChanged = (level) => {
    const currentWords = this.generateCurrentWords(level, this.state.currentPage);
    const shuffledCurrentWords = shuffleArray(currentWords);
    this.setState({
      currentLevel: level,
      currentWords,
      shuffledCurrentWords,
    });
  }

  pageChanged = (page) => {
    const currentWords = this.generateCurrentWords(this.state.currentLevel, page);
    const shuffledCurrentWords = shuffleArray(currentWords);
    this.setState({
      currentPage: page,
      currentWords,
      shuffledCurrentWords,
    });
  }

  showDefinition = (definitionObj) => {
    this.setState((state) => {
      const currentWords = replaceElInArrayOfObject(
        state.currentWords, definitionObj, { hideDefinition: false },
      );

      const shuffledCurrentWords = replaceElInArrayOfObject(
        state.shuffledCurrentWords, definitionObj, { hideDefinition: false },
      );

      return {
        currentWords,
        shuffledCurrentWords,
      };
    });
  }

  wordDropped = (droppedWordObj, dropTargetWordObj) => {
    this.setState((state) => {
      const isRightAttempt = droppedWordObj.id === dropTargetWordObj.id;
      const audio = isRightAttempt ? soundSuccess : soundError;
      playAudio(audio);

      const currentWords = replaceElInArrayOfObject(
        state.currentWords, droppedWordObj, {
          attempt: isRightAttempt, hideDefinition: !isRightAttempt,
        },
      );

      const shuffledCurrentWords = replaceElInArrayOfObject(
        state.shuffledCurrentWords, dropTargetWordObj, {
          attempt: isRightAttempt, hideDefinition: !isRightAttempt,
        },
      );

      return {
        currentWords,
        shuffledCurrentWords,
      };
    });
  }

  showNotifications = (notifications) => {
    this.setState({
      notifications,
    });
  }

  render() {
    const {
      loading,
      currentWords,
      currentLevel,
      currentPage,
      shuffledCurrentWords,
      useUserWords,
    } = this.state;

    return (
      <div className="unmess-game-container">
        <Switch>
          <Route path="/unmess/home" render={() => (
            <StartPage
              showNotifications={this.showNotifications}
              isUserLogged={Boolean(this.userId)}
              useUserWords={useUserWords}
              currentPage={currentPage}
              currentLevel={currentLevel}
              loading={loading}
              levelChanged={this.levelChanged}
              pageChanged={this.pageChanged}
            />
          )} />
          <Route path="/unmess/game" render={({ history }) => (
            <GamePage
              history={history}
              shuffledCurrentWords={shuffledCurrentWords}
              currentWords={currentWords}
              wordDropped={this.wordDropped}
              showDefinition={this.showDefinition}
            />
          )} />
          <Route path="/unmess/results" render={({ history }) => (
            <ResultsPage
              history={history}
              currentWords={currentWords}
              currentLevel={currentLevel}
              levelChanged={this.levelChanged}
            />
          )} />
          <Route path="/unmess/latest-results" render={({ history }) => (
            <LatestResultsPage
              history={history}
              currentLevel={currentLevel}
              levelChanged={this.levelChanged}
              currentWords={currentWords} />
          )} />
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
  userId: PropTypes.string,
};

const mapStateToProps = (store) => ({
  userId: store.auth.userId,
});

export default withWordsService()(connect(mapStateToProps)(App));
