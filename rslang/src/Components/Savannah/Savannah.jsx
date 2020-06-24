import React, { Component } from 'react';
import Header from './components/Header';
import StartPage from './components/StartPage';
import FinishPage from './components/FinishPage';
import ActiveQuiz from './components/ActiveQuiz';
import {
  getCards, getRandomIntInclusive, totalQuizInGroup, audioPlay,
} from './components/services/services';
import { STATUS_QUIZ, RESULT_TITLE, AUDIO_PATH } from './components/services/constants';
import classes from './Savannah.module.scss';

const initialState = {
  timer: 0,
  activeQuestion: '',
  activeCard: 0,
  audio: [],
  answerState: null,
  currentGroup: null,
  counter: 1,
  changeGroup: false,
  idWords: [],
  isFinished: false,
  isStarted: false,
  totalAnswers: 2,
  translateWords: [],
  totalQuestions: 0,
  volume: true,
  heartCount: 5,
  keyPressed: null,
  words: '',
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

class Savannah extends Component {
  status = STATUS_QUIZ;

  resultTitle = RESULT_TITLE;

  audioPath = AUDIO_PATH;

  state = initialState

  updateState = async (group, totalAnswers) => {
    const words = [];
    const translateWords = [];
    const idWords = [];
    const answerState = null;
    const audio = [];
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

      this.setState({
        words, translateWords, idWords, answerState, activeCard, activeQuestion, audio
        ,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onTotalQuizUpdate = (e) => {
    const { value } = e.target;
    this.setState({ totalQuestions: value });
  }

  guessedWords = (currentAnswer, error, success) => {
    this.setState({
      answerState: [
        { [currentAnswer]: error },
        { [this.state.activeCard]: success },
      ],
    });
  }

  handleHeart = () => {
    this.setState(({ heartCount }) => ({
      heartCount: heartCount - 1,
    }));
  }

  updateCounter = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  handleVolume = () => {
    this.setState(({ volume }) => ({
      volume: !volume,
    }));
  }

  handleClose = () => {
    this.setState({ isFinished: true });
    this.audioPlay(this.audioPath[2]);
  }

  audioPlay = (path) => {
    if (this.state.volume) {
      audioPlay(path);
    }
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

  handleCurrentGroup = (e) => {
    if (e.target.value === '-1') {
      this.setState({ changeGroup: true, currentGroup: 0 });
    } else {
      this.setState({ currentGroup: +e.target.value, changeGroup: false });
    }
  }

  handleTotalAnswer = (e) => {
    this.setState({ totalAnswers: +e.target.value });
  }

  onClickHandler = () => {
    if (this.state.currentGroup !== null) {
      this.setState({ isStarted: true });
    }
    this.updateState(this.state.currentGroup, this.state.totalAnswers);
  }

  onTimeOut = () => {
    setInterval(() => {
      this.setState(({ timer }) => ({
        timer: timer + 1,
      }));
    }, 1000);
  }

  gameStatus = (idWordPressed = 'default') => {
    if (this.state.heartCount === 1 || this.state.counter === +this.state.totalQuestions) {
      setTimeout(() => {
        this.handleClose();
      }, 800);
    } else if (idWordPressed) {
      setTimeout(() => {
        this.updateState(this.state.currentGroup, this.state.totalAnswers);
      }, 500);
      this.updateCounter();
    }
  }

  onChangeGroupwords = () => {
    if (this.state.counter !== 0 && this.state.counter
      % totalQuizInGroup(this.state.totalQuestions) === 0 && this.state.changeGroup) {
      this.setState(({ currentGroup }) => ({ currentGroup: currentGroup + 1 }));
    }
  }

  onCorrectAnswer = (idWordPressed = 'default') => {
    if (idWordPressed === this.state.idWords[this.state.activeCard]) {
      this.resultCurrentQuiz('complete');
      this.guessedWords(idWordPressed, null, 'success');
      this.audioPlay(this.audioPath[0]);
    } else {
      this.resultCurrentQuiz('mistake');
      this.handleHeart();
      this.audioPlay(this.audioPath[1]);
      this.guessedWords(idWordPressed, (idWordPressed === 'default' ? null : 'error'), 'success');
    }
  }

  onAnswerClickHandler = (e) => {
    const { idWords, answerState } = this.state;
    this.setState({ timer: 0 });
    const idWordPressed = e.target.id || idWords[Number(e.key) - 1];

    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === this.status[0] || this.status[1]) {
        return;
      }
    }

    this.gameStatus(idWordPressed);
    this.onChangeGroupwords();
    this.onCorrectAnswer(idWordPressed);
  }

  onDefault = () => {
    this.gameStatus();
    this.onChangeGroupwords();
    this.onCorrectAnswer();
    this.setState({ timer: 0 });
  }

  render() {
    const {
      heartCount, volume, complete, mistake, translateWords, idWords, timer,
      answerState, activeQuestion, isStarted, isFinished, audio,
    } = this.state;

    let page;
    if (!isStarted) {
      page = < StartPage
        onTotalQuizUpdate={this.onTotalQuizUpdate}
        onSubmitForm={this.onClickHandler}
        handleCurrentGroup={this.handleCurrentGroup}
        handleTotalAnswer={this.handleTotalAnswer}
      />;
    } else if (isStarted && isFinished) {
      page = <FinishPage
        complete={complete}
        mistake={mistake}
        resultTitle={this.resultTitle}
        status={this.status}
        pathAudio={audio}
      />;
    } else if (isStarted && !isFinished) {
      page = <div>
        <Header
          volume={volume}
          heartCount={heartCount}
          handleVolume={this.handleVolume}
          mistakeTotal={mistake.total}
          handleClose={this.handleClose}
        />
        <ActiveQuiz
          guessedWords={this.onAnswerClickHandler}
          translateWords={translateWords}
          id={idWords}
          state={answerState}
          activeQuestion={activeQuestion}
          isStarted={isStarted}
          keyPressed={this.onAnswerClickHandler}
          timer={timer}
          onTimeOut={this.onTimeOut}
          onDefault={this.onDefault}
          updateState={this.updateState}
        />
      </div>;
    }

    return (
      <div className={classes.Savannah}>
        <div className={classes.Container}>
          {page}
        </div>
      </div>
    );
  }
}
export default Savannah;
