import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartGame from './Components/StartGame';
import PlayGame from './Components/PlayGame';
import FinishGame from './Components/FinishGame';
import UserService from '../../helpers/userService';

import {
  text,
  count,
  gamesData,
  questionStatus,
  applicationThings,
  localStorageItems,
  soundError,
  soundSuccess,
} from '../../helpers/constants';

import {
  handleGameRightAnswer,
  handleGameWrongAnswer,
  saveSessionInfoToLocal,
} from '../../helpers/wordsService';

import { getWordsByAmount } from '../../helpers/wordsService/wordsApi';

import './Sprint.scss';
import {
  getRandomNumber,
  playAudio,
  shuffleArray,
} from '../../helpers/functions';

const initialState = {
  wordObject: {},
  checkedUserWords: false,
  allUserWords: [],
  timer: 60,
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
    win: 0,
  },
  changeGroup: false,
  translateWords: [],
  words: [],
  isFinished: false,
  isStarted: false,
  volume: true,
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

const userService = new UserService();
const { getUserWordsNoRemoved } = userService;

class Sprint extends Component {
  basic = count.sprint.pointsMultiplier

  status = questionStatus;

  state = initialState

  resultTitle = {
    success: text.ru.answersCorrect,
    error: text.ru.answersMistaken,
  };

  updateState = async () => {
    const words = [];
    const translateWords = [];
    const answerState = null;
    const audio = [];
    let isTrue = false;
    const token = this.props.token
      || localStorage.getItem(localStorageItems.token);
    const userId = this.props.userId
      || localStorage.getItem(localStorageItems.userId);

    try {
      const allUserWordsRandom = shuffleArray(token && this.state.checkedUserWords
        ? await getUserWordsNoRemoved(userId)
        : []);

      if (!this.state.allUserWords.length) {
        this.setState({ allUserWords: allUserWordsRandom });
      }
      const { counter, allUserWords } = this.state;
      const { total } = counter;
      const userWords = allUserWords.slice(total, total + 2);

      const allCards = (allUserWords.length - 1 > total)
        ? userWords
        : await getWordsByAmount(this.state.currentGroup, 2);
      allCards.forEach((card) => {
        words.push(card.word);
        translateWords.push(card.wordTranslate);
        audio.push(card.audio);
      });
      const activeCard = getRandomNumber(0, allCards.length - 1);
      const activeQuestion = words[0];
      const wordObject = allCards[0];
      const activeAnswer = translateWords[Math.round(Math.random())];
      if (translateWords[0] === activeAnswer) {
        isTrue = true;
      }
      this.setState({
        wordObject,
        words,
        translateWords,
        answerState,
        activeCard,
        activeQuestion,
        audio,
        activeAnswer,
        isTrue
        ,
      });
    } catch (e) {
      console.error(e);
      // TODO add erorrs' handler
    }
  }

  audioPlay = (path) => (this.state.volume) && playAudio(path);

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

  updateCounter = (mult = 1, win = 0) => {
    const multiplier = win && this.state.counter.win
    && this.state.counter.win % count.sprint.correctAnswerOnce === 0 ? mult : 1;
    this.setState(({ counter }) => ({
      counter: {
        total: counter.total + 1,
        multiplier: win ? counter.multiplier * multiplier : mult,
        win: win ? counter.win + win : 0,
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
      saveSessionInfoToLocal(applicationThings.SPRINT);
    }
  }

  onClickHandler = (e) => {
    let value;
    if (e.key === 'ArrowLeft') {
      value = false;
    } else if (e.key === 'ArrowRight') {
      value = true;
    } else if (e.currentTarget.value) {
      value = Boolean(Number(e.currentTarget.value));
    } else {
      value = null;
    }
    if (value !== null) {
      const { answerState } = this.state;
      const isTrue = value;

      if (answerState) {
        return;
      }

      this.setState({ answerState: true });

      if (isTrue === this.state.isTrue) {
        this.setState({ isAnswerQuiz: 'check' });
        this.audioPlay(soundSuccess);
        this.updateCounter(count.sprint.counterMultiplier, 1);
        this.updateScore(this.basic);
        this.resultCurrentQuiz('complete');
        handleGameRightAnswer(applicationThings.SPRINT, this.state.wordObject);
      } else {
        this.audioPlay(soundError);
        this.setState({ isAnswerQuiz: 'times' });
        this.updateCounter();
        this.resultCurrentQuiz('mistake');
        handleGameWrongAnswer(applicationThings.SPRINT, this.state.wordObject);
      }
      this.updateState();
    }
  }

  onReloadGame = () => {
    const state = { ...initialState };
    this.setState({ ...state });
    this.updateState();
  }

  isChangeUserWords = () => {
    this.setState(({ checkedUserWords }) => ({
      checkedUserWords: !checkedUserWords,
    }));
  }

  handleCurrentGroup = (event) => {
    this.setState({ currentGroup: event.target.value });
  }

  render() {
    const {
      words, activeAnswer, translateWords, isAnswerQuiz, counter,
      volume, score, timer, isFinished, mistake, complete, isStarted,
    } = this.state;

    let page;
    if (!isStarted) {
      page = <StartGame
        isStarted={isStarted}
        startGame={() => this.setState({ isStarted: true })}
        handleChangeUserWords={this.isChangeUserWords}
        handleCurrentGroup={this.handleCurrentGroup}
        updateState={this.updateState}
      />;
    } else if (isStarted && isFinished) {
      page = <FinishGame
        status={this.status}
        resultTitle={this.resultTitle}
        isFinished={isFinished}
        mistake={mistake}
        complete={complete}
        audioPlay={this.audioPlay}
        onReloadGame={this.onReloadGame}
      />;
    } else if (isStarted && !isFinished && activeAnswer) {
      page = <PlayGame
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
      />;
    }

    return (
      <div className={'sprint__wrapper'}>
        <div className={'sprint__container'}>
          <h1>{ gamesData.sprint.title }</h1>
          {page}

        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

Sprint.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.string,
};

export default connect(mapStateToProps)(Sprint);
