/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import classNames from 'classnames';
import StartGame from './Components/StartGame';
import PlayGame from './Components/PlayGame';
import FinishGame from './Components/FinishGame';
import {
  getCards, getRandomIntInclusive, totalQuizInGroup, audioPlay,
} from './services/services';
import {
  STATUS_QUIZ, RESULT_TITLE, AUDIO_PATH, BASIC, CORRECT_ANSWER_ONCE
} from './services/constants';

import './Sprint.scss';

const initialState = {

  timer: 5,
  score: 0,
  activeQuestion: '',
  activeAnswer: '',
  activeCard: 0,
  isTrue: false,
  isAnswerQuiz: 'default',
  audio: [],
  answerState: null,
  currentGroup: null,
  counter: {
    total: 0,
    multiplier: 1,
    win: 1,
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

  basic = BASIC

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
        audio: [...audio],
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

  updateCounter = (total, mult = 1, win = 0) => {
    const multiplier = win && this.state.counter.win % CORRECT_ANSWER_ONCE === 0 ? mult : 1;
    this.setState(({ counter }) => ({
      counter: {
        total: counter.total + total,
        multiplier: win ? counter.multiplier * multiplier : mult,
        win: win ? counter.win + win : 1,
      },
    }));
  }

  updateScore = (basic) => {
    this.setState(({ score }) => ({
      score: score + this.state.counter.multiplier * basic,
    }));
  }

  updateTimer = () => {
    const timerId = setTimeout(() => {
      this.setState(({ timer }) => ({
        timer: timer - 1,
      }));
    }, 1000);
    if (this.state.timer === 0) {
      clearTimeout(timerId);
      this.setState({ isFinished: true });
    }
  }

  onClickHandler = (e) => {
    const { answerState } = this.state;
    const isTrue = Boolean(Number(e.currentTarget.value));

    if (answerState) {
      return;
    }

    this.setState({ answerState: true });
    // this.updateCounter(1);

    if (isTrue === this.state.isTrue) {
      this.setState({ isAnswerQuiz: 'check' });
      this.audioPlay(this.audioPath.success);
      this.updateCounter(1, 2, 1);
      this.updateScore(this.basic);
      this.resultCurrentQuiz('complete')
    } else {
      this.audioPlay(this.audioPath.error);
      this.setState({ isAnswerQuiz: 'times' });
      this.updateCounter(1);
      this.resultCurrentQuiz('mistake')
    }
    this.updateState(3, 2);
  }

  componentDidMount() {
    this.updateState(3, 2);
  }

  render() {
    const {
      words, activeAnswer, translateWords, isAnswerQuiz, counter,
      volume, score, timer, isFinished, mistake, complete
    } = this.state;
    return (
      <div className={'sprint__wrapper'}>
        <div className={'sprint__container'}>
          {
            isFinished
              ? <FinishGame
                isFinished={isFinished}
                mistake={mistake}
                complete={complete}
                audioPlay={this.audioPlay}
              />
              : <PlayGame
                words={words}
                activeAnswer={activeAnswer}
                onCLick={this.onClickHandler}
                translateWords={translateWords}
                isAnswerQuiz={isAnswerQuiz}
                counterTotal={counter.total}
                volume={volume}
                handleVolume={this.handleVolume}
                score={score}
                timer={timer}
                updateTimer={this.updateTimer}
              />
          }

        </div>
      </div>

    );
  }
}

export default Sprint;
