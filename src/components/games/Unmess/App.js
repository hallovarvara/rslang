import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Notification from '../../../basicComponents/Notification';

import StartPage from './components/pages/Start';
import GamePage from './components/pages/Game';
import ResultsPage from './components/pages/Results';
import LatestResultsPage from './components/pages/LatestResults';

import UserService from '../../../helpers/userService';

import {
  wordsPerPage,
  localStorageItems,
} from './helpers/contants';

import {
  soundSuccess,
  soundError,
  applicationThings,
  text,
} from '../../../helpers/constants';
import { playAudio } from '../../../helpers/functions';
import { handleGameRightAnswer, handleGameWrongAnswer } from '../../../helpers/wordsService';

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

const userService = new UserService();

class App extends React.Component {
  state = {
    currentLevel: 0,
    currentPage: 0,
    loading: true,
    currentWords: null,
    shuffledCurrentWords: null,
    useUserWords: false,
    notifications: [],
    isUserLogged: false,
  }

  allWords = null;

  componentDidMount() {
    if (localStorage.getItem(localStorageItems.latestResults) === null) {
      localStorage.setItem(localStorageItems.latestResults, JSON.stringify([]));
    }

    userService.isUserLogged()
      .then((result) => {
        this.setState({
          isUserLogged: Boolean(result),
          useUserWords: Boolean(result),
          loading: false,
        });
      });
  }

  setUsingOfUserWords = (useUserWords) => {
    this.setState({
      useUserWords,
    });
  }

  generateWordsForGame = async () => {
    this.setState({
      loading: true,
    });
    const {
      currentLevel,
      currentPage,
      useUserWords,
    } = this.state;

    try {
      userService.prepareWordsForGame(
        applicationThings.UNMESS, currentLevel, currentPage, wordsPerPage, useUserWords,
      ).then((result) => {
        if (result && result.length) {
          this.clearCurrentWords = result;
          const currentWords = shuffleArray(result);
          const shuffledCurrentWords = shuffleArray(currentWords);
          this.setState({
            loading: false,
            currentWords,
            shuffledCurrentWords,
          });
        } else {
          this.showNotifications([
            {
              type: 'error',
              message: text.ru.backendCrashed,
            },
          ]);
        }
      });
    } catch (error) {
      this.showNotifications([
        {
          type: 'error',
          message: text.ru.backendCrashed,
        },
      ]);
    }
  }

  levelChanged = (level) => {
    this.setState({
      currentLevel: level,
    });
  }

  pageChanged = (page) => {
    this.setState({
      currentPage: page,
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

      const clearWordObj = this.clearCurrentWords.find((wordObj) => (
        wordObj.id === droppedWordObj.id
      ));
      if (isRightAttempt) {
        handleGameRightAnswer(applicationThings.UNMESS, clearWordObj);
      } else {
        handleGameWrongAnswer(applicationThings.UNMESS, clearWordObj);
      }

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
      isUserLogged,
    } = this.state;

    return (
      <div className="unmess-game-container">
        <Switch>
          <Route path="/unmess/home" render={() => (
            <StartPage
              generateWordsForGame={this.generateWordsForGame}
              setUsingOfUserWords={this.setUsingOfUserWords}
              showNotifications={this.showNotifications}
              isUserLogged={isUserLogged}
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
              loading={loading}
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
};

export default App;
