import React, { Component } from 'react';
import { connect } from 'react-redux';
import StartGame from './Components/StartGame';
import PlayGame from './Components/PlayGame';
import FinishGame from './Components/FinishGame';
import WordsService from '../../helpers/WordsService';
import { UserService } from '../../helpers/UserService';

import {
  AUDIO_PATH, BASIC, CORRECT_ANSWER_ONCE, MULTIPLIER,
} from './services/constants';

import './Sprint.scss';

const initialState = {
  token: null,
  userId: null,
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

const wordsService = new WordsService();
const {
  getCountCardsInGroup, getRandomIntInclusive, audioPlay, shuffleArray,
} = wordsService;

const userService = new UserService();
const {
  allUserWordsArray, loginUser, getUserAllWords, getUserWordsNoRemoved,
} = userService;

class Sprint extends Component {
  audioPath = AUDIO_PATH;

  basic = BASIC

  state = initialState

  updateState = async () => {
    const words = [];
    const translateWords = [];
    const answerState = null;
    const audio = [];
    let isTrue = false;
    const token = this.props.token || localStorage.getItem('rslangToken')
    const userId = this.props.userId || localStorage.getItem('rslangUserId')

    try {
      const allUserWordsRandom = shuffleArray(token && this.state.checkedUserWords
        ? await getUserWordsNoRemoved(userId)
        : []);

      if (!this.state.allUserWords.length) {
        this.setState({ allUserWords: allUserWordsRandom });
      }
      console.log(this.state.allUserWords);
      console.log(getUserWordsNoRemoved(userId));
      const { counter, allUserWords } = this.state;
      const { total } = counter;
      const userWords = allUserWords.slice(total, total + 2);

      const allCards = (allUserWords.length - 1 > total)
        ? userWords
        : await getCountCardsInGroup(this.state.currentGroup, 2);
      console.log('allCards', allCards);
      allCards.forEach((card) => {
        words.push(card.word);
        translateWords.push(card.wordTranslate);
        audio.push(card.audio);
      });
      const activeCard = getRandomIntInclusive(0, allCards.length - 1);
      const activeQuestion = allCards[activeCard].word;
      const activeAnswer = translateWords[Math.round(Math.random())];
      if (translateWords[0] === activeAnswer) {
        isTrue = true;
      }
      this.setState({
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

  updateCounter = (mult = 1, win = 0) => {
    const multiplier = win && this.state.counter.win
      && this.state.counter.win % CORRECT_ANSWER_ONCE === 0 ? mult : 1;
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
        this.audioPlay(this.audioPath.success);
        this.updateCounter(MULTIPLIER, 1);
        this.updateScore(this.basic);
        this.resultCurrentQuiz('complete');
      } else {
        this.audioPlay(this.audioPath.error);
        this.setState({ isAnswerQuiz: 'times' });
        this.updateCounter();
        this.resultCurrentQuiz('mistake');
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
        isFinished={isFinished}
        mistake={mistake}
        complete={complete}
        audioPlay={this.audioPlay}
        onReloadGame={this.onReloadGame}
      />;
    } else if (isStarted && !isFinished) {
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

export default connect(mapStateToProps)(Sprint);
