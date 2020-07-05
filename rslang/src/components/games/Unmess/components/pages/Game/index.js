import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GamePageView from './GamePage.jsx';

class GamePage extends React.Component {
  currentDraggedWord = null;

  preventDefaultFunc = (event) => {
    event.preventDefault();
  }

  componentDidMount() {
    document.addEventListener('dragover', this.preventDefaultFunc);
  }

  componentWillUnmount() {
    document.removeEventListener('dragover', this.preventDefaultFunc);
  }

  dragStart = (event, wordObj) => {
    const { target } = event;
    this.currentDraggedWord = { ...wordObj };
    target.style.opacity = 0.5;
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.add('dash-border-animated');
    });
  }

  dragEnd = (event) => {
    const { target } = event;
    target.style.opacity = '';
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.remove('dash-border-animated');
    });
  }

  dragEnter = (event) => {
    const { currentTarget } = event;
    currentTarget.classList.add('dragover');
  }

  dragLeave = (event) => {
    const { currentTarget } = event;
    currentTarget.classList.remove('dragover');
  }

  drop = (event, wordObj) => {
    const { currentTarget } = event;
    currentTarget.classList.remove('dragover');
    this.props.wordDropped(this.currentDraggedWord, wordObj);
    document.querySelectorAll('.definitions-container__definition').forEach((el) => {
      el.classList.remove('dash-border-animated');
    });
  }

  render() {
    const {
      currentWords,
      shuffledCurrentWords,
    } = this.props;

    const untouchedWords = [];
    const untouchedDefinitions = [];
    const guessedWords = [];
    const wrongWords = [];

    if (currentWords === null) {
      return <Redirect to="/unmess/home" />;
    }

    currentWords.forEach((wordObj) => {
      if (wordObj.attempt === null) {
        untouchedWords.push({ ...wordObj });
      } else if (wordObj.attempt === true) {
        guessedWords.push({ ...wordObj });
      } else if (wordObj.attempt === false) {
        wrongWords.push({ ...wordObj });
      }
    });

    if (untouchedWords.length === 0) {
      setTimeout(() => {
        this.props.history.push('/unmess/results');
      }, 1500);
    }

    shuffledCurrentWords.forEach((wordObj) => {
      if (wordObj.hideDefinition === true) {
        untouchedDefinitions.push({ ...wordObj });
      }
    });

    return <GamePageView
      {...this.props}
      untouchedWords={untouchedWords}
      dragStart={this.dragStart}
      dragEnd={this.dragEnd}
      dragEnter={this.dragEnter}
      dragLeave={this.dragLeave}
      drop={this.drop}
      untouchedDefinitions={untouchedDefinitions}
      guessedWords={guessedWords}
      wrongWords={wrongWords} />;
  }
}

GamePage.propTypes = {
  wordDropped: PropTypes.func,
  shuffledCurrentWords: PropTypes.arrayOf(PropTypes.object),
  currentWords: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

export default GamePage;
