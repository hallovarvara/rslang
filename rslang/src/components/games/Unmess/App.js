import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import StartPage from './components/pages/Start';
import GamePage from './components/pages/Game';
import ResultsPage from './components/pages/Results';
import LatestResultsPage from './components/pages/LatestResults';

import { withWordsService } from '../hoc';

import {
  pagesCount,
  levelsCount,
  wordsPerPage,
  localStorageItems,
} from './helpers/contants';

const getRandomWords = (words) => (
  words
    .sort(() => Math.random() - 0.5)
    .slice(0, wordsPerPage)
    .map((obj) => ({ ...obj, attempt: null, hideDefinition: true }))
);

const getShuffledWords = (words) => (
  words
    .slice()
    .sort(() => Math.random() - 0.5)
    .map((wordObj) => ({ ...wordObj }))
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
  }

  allWords = null;

  componentDidMount() {
    if (localStorage.getItem(localStorageItems.latestResults) === null) {
      localStorage.setItem(localStorageItems.latestResults, JSON.stringify([]));
    }

    const { wordsService } = this.props;
    wordsService.getAllWords(pagesCount, levelsCount)
      .then((result) => {
        this.allWords = result;
        const { currentLevel, currentPage } = this.state;
        const currentWords = getRandomWords(this.allWords[currentLevel][currentPage]);
        const shuffledCurrentWords = getShuffledWords(currentWords);
        this.setState({
          loading: false,
          currentWords,
          shuffledCurrentWords,
        });
      });
  }

  levelChanged = (level) => {
    const currentWords = getRandomWords(this.allWords[level][this.state.currentPage]);
    const shuffledCurrentWords = getShuffledWords(currentWords);
    this.setState({
      currentLevel: level,
      currentWords,
      shuffledCurrentWords,
    });
  }

  pageChanged = (page) => {
    const currentWords = getRandomWords(this.allWords[this.state.currentLevel][page]);
    const shuffledCurrentWords = getShuffledWords(currentWords);
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

  render() {
    const {
      loading,
      currentWords,
      currentLevel,
      currentPage,
      shuffledCurrentWords,
    } = this.state;

    return (
      <div className="unmess-game-container">
        <Switch>
          <Route path="/unmess/home" render={() => (
            <StartPage
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
      </div>
    );
  }
}

App.propTypes = {
  wordsService: PropTypes.object,
};

export default withWordsService()(App);
