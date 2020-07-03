import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import StartPage from './components/pages/Start';
import GamePage from './components/pages/Game';

import { withWordsService } from '../hoc';

import { pagesCount, levelsCount, wordsPerPage } from './helpers/contants';

class App extends React.Component {
  state = {
    currentLevel: 0,
    loading: true,
    currentWords: null,
  }

  allWords = null;

  componentDidMount() {
    const { wordsService } = this.props;
    wordsService.getAllWords(pagesCount, levelsCount)
      .then((result) => {
        this.allWords = result;
        const currentWords = this.allWords[this.state.currentLevel]
          .sort(() => Math.random() - 0.5)
          .slice(0, wordsPerPage);
        this.setState({
          loading: false,
          currentWords,
        });
      });
  }

  levelChanged = (level) => {
    this.setState({
      currentLevel: level,
      currentWords: this.allWords[level]
        .sort(() => Math.random() - 0.5)
        .slice(0, wordsPerPage)
        .map((obj) => ({ ...obj })),
    });
  }

  render() {
    const {
      loading,
      currentWords,
      currentLevel,
    } = this.state;

    return (
      <div className="unmess-game-container">
        <Switch>
          <Route path="/unmess/home" render={() => (
            <StartPage
              currentLevel={currentLevel}
              loading={loading}
              levelChanged={this.levelChanged}
            />
          )} />
          <Route path="/unmess/game" render={() => (
            <GamePage
              currentWords={currentWords}
            />
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
