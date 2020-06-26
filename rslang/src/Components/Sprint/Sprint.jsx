/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import classNames from 'classnames';
import StartGame from './Components/StartGame';
import PlayGame from './Components/PlayGame';
import {
  getCards, getRandomIntInclusive, totalQuizInGroup, audioPlay,
} from './services/services';
import { STATUS_QUIZ, RESULT_TITLE, AUDIO_PATH } from './services/constants';

import './Sprint.scss';

const initialState = {

  activeQuestion: '',
  activeAnswer: '',
  activeCard: 0,
  isTrue: false,
  isAnswerQuiz: 'default',
  audio: [],
  answerState: null,
  currentGroup: null,
  counter: {
    rang: 0,
    total: 0,
    win: 0,
  },
  changeGroup: false,
  idWords: [],
  translateWords: [],
  words: [],
  isFinished: false,
  isStarted: false,
  volume: true,
  keyPressed: null,
  mistake: {
    total: 0,
    words: [],
    translate: [],
    audio: [],
  },
  complete: {
    total: 0,
    words: [],
    translate: [],
    audio: [],
  },
};

class Sprint extends Component {
  audioPath = AUDIO_PATH;

  state = initialState

  updateState = async (group, totalAnswers) => {
    const words = [];
    const translateWords = [];
    const idWords = [];
    const answerState = null;
    const audio = [];
    let isTrue = false;

    try {
      const allCards = await getCards(group, totalAnswers);

      allCards.forEach((card) => {
        words.push(card.word);
        translateWords.push(card.wordTranslate);
        idWords.push(card.id);
        audio.push(card.audio);
      });
      const activeCard = getRandomIntInclusive(0, allCards.length - 1);
      const activeQuestion = allCards[activeCard].word;
      const activeAnswer = translateWords[Math.round(Math.random())];
      if (translateWords[0] === activeAnswer) {
        isTrue = true;
      }
      this.setState({
        words, translateWords, idWords, answerState, activeCard, activeQuestion, audio, activeAnswer, isTrue
        ,
      });
    } catch (e) {
      console.log(e);
    }
  }

  audioPlay = (path) => {
    if (this.state.volume) {
      audioPlay(path);
    }
  }

  handleVolume = () => {
    this.setState(({ volume }) => ({
      volume: !volume,
    }));
  }

  resultCurrentQuiz = (value) => {
    const {
      words, translate, total, audio,
    } = this.state[value];
    translate.push(this.state.translateWords[this.state.activeCard]);
    audio.push(this.state.audio[this.state.activeCard]);
    words.push(this.state.activeQuestion);
    this.setState({
      [value]: {
        total: total + 1,
        words: [...words],
        translate: [...translate],
        audio: [...translate],
      },
    });
  }

  guessedWords = (currentAnswer, error, success) => {
    this.setState({
      answerState: [
        { [currentAnswer]: error },
        { [this.state.activeCard]: success },
      ],
    });
  }

  /*  onCorrectAnswer = (idWordPressed) => {
     if (idWordPressed === this.state.translateWords[idWordPressed]) {
       this.resultCurrentQuiz('complete');
       this.guessedWords(idWordPressed, null, 'success');
       this.audioPlay(this.audioPath[0]);
     } else {
       this.resultCurrentQuiz('mistake');
       this.audioPlay(this.audioPath[1]);
       this.guessedWords(idWordPressed, 'error', null);
     }
   } */
  updateCounterRang = () => {
    this.setState(({ counter }) => ({
      counter: {
        rang: counter.rang + 1,
        total: 0,
      },
    }));
    if (this.state.counter.rang === 3 || this.state.isAnswerQuiz === 'error') {
      this.setState({
        counter: {
          rang: 1,
          total: 0,
        },
      });
    }
  }

  onClickHandler = (e) => {
    const { answerState } = this.state;
    const isTrue = Boolean(e.currentTarget.value);

    if (answerState) {
      return;
    }

    this.setState({ answerState: true });
    this.updateCounterRang();

    if (isTrue === this.state.isTrue) {
      this.setState({ isAnswerQuiz: 'check' });
      this.audioPlay(this.audioPath[0]);
    } else {
      this.audioPlay(this.audioPath[1]);
      this.setState({ isAnswerQuiz: 'times' });
    }
    this.updateState(3, 2);
  }

  componentDidMount() {
    this.updateState(3, 2);
  }

  render() {
    const {
      words, activeAnswer, translateWords, isAnswerQuiz, counter,
      volume,
    } = this.state;
    return (
      <div className={'sprint__wrapper'}>
        <div className={'sprint__container'}>
          <PlayGame
            words={words}
            activeAnswer={activeAnswer}
            onCLick={this.onClickHandler}
            translateWords={translateWords}
            isAnswerQuiz={isAnswerQuiz}
            counterRang={counter.rang}
            volume={volume}
            handleVolume={this.handleVolume}
          />
        </div>
      </div>

    );
  }
}

export default Sprint;
