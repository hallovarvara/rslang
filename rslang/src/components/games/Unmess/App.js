import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import StartPage from './components/pages/Start';
import GamePage from './components/pages/Game';

import { withWordsService } from '../hoc';

import { pagesCount, levelsCount, wordsPerPage } from './helpers/contants';
import getRandomNumber from './helpers/get_random_number';

class App extends React.Component {
  state = {
    loading: true,
    currentWords: null,
  }

  allWords = null;

  componentDidMount() {
    const { wordsService } = this.props;
    wordsService.getAllWords(pagesCount, levelsCount)
      .then((result) => {
        this.allWords = result;
        const randomLevel = getRandomNumber(0, levelsCount);
        const randomWords = this.allWords[randomLevel]
          .sort(() => Math.random() - 0.5)
          .slice(0, wordsPerPage);
        this.setState({
          loading: false,
          currentWords: randomWords,
        });
      });
  }

  render() {
    const {
      loading,
      currentWords,
    } = this.state;

    return (
      <div className="unmess-game-container">
        <Switch>
          <Route path="/unmess/home" render={() => <StartPage loading={loading}/>} />
          <Route path="/unmess/game" render={() => (
            <GamePage
              currentWords={currentWords}/>
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
