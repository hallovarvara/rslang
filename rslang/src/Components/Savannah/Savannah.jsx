import React, { Component } from 'react';
import Header from './components/Header';
import StartPage from './components/StartPage';
import FinishPage from './components/FinishPage';
import ActiveQuiz from './components/ActiveQuiz';
import {
  getCards, getRandomIntInclusive, totalQuizInGroup, audioPlay,
} from './components/services/services';
import classes from './Savannah.module.scss';

const initialState = {
  activeQuestion: '',
  activeCard: 0,
  audio: [],
  allCards: [],
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
  resultTitle: ['Ошибок', 'Знаю'],
};

class Savannah extends Component {
  status = ['error', 'success'];

  audioPath = ['files/success.mp3', 'files/error.mp3', 'files/to_finish_page.mp3'];

  state = initialState

  updateState = async (group, totalAnswers) => {
    const words = [];
    const translateWords = [];
    const idWords = [];
    const answerState = null;
    const timer = false;
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
        words, translateWords, idWords, answerState, activeCard, activeQuestion, timer, audio
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
    if (this.state.volume) audioPlay(path);
  }

  handleComplete = () => {
    const words = [...this.state.complete.words];
    const translate = [...this.state.complete.translate];
    const total = this.state.complete.total + 1;
    const audio = [...this.state.complete.audio];
    translate.push(this.state.translateWords[this.state.activeCard]);
    audio.push(this.state.audio[this.state.activeCard]);
    words.push(this.state.activeQuestion);
    this.setState({
      complete: {
        total,
        words,
        translate,
        audio,
      },
    });
  }

  handleMistake = () => {
    const words = [...this.state.mistake.words];
    const translate = [...this.state.mistake.translate];
    const total = this.state.mistake.total + 1;
    const audio = [...this.state.mistake.audio];
    translate.push(this.state.translateWords[this.state.activeCard]);
    words.push(this.state.activeQuestion);
    audio.push(this.state.audio[this.state.activeCard]);
    this.setState({
      mistake: {
        total,
        words,
        translate,
        audio,
      },
    });
  }

  handleCurrentGroup = (e) => {
    if (e.target.value === '-1') {
      this.setState({ changeGroup: true });
      this.setState({ currentGroup: 0 });
    } else {
      this.setState({ currentGroup: +e.target.value });
      this.setState({ changeGroup: false });
    }
  }

  handleTotalAnswer = (e) => {
    this.setState({ totalAnswers: +e.target.value });
  }

  onClickHandler = () => {
    if (this.state.currentGroup !== null) this.setState({ isStarted: true });
    this.updateState(this.state.currentGroup, this.state.totalAnswers);
  }

  onAnswerClickHandler = (e) => {
    if (this.state.heartCount === 1 || this.state.counter === +this.state.totalQuestions) {
      setTimeout(() => {
        this.handleClose();
      }, 800);
    } else {
      setTimeout(() => {
        this.updateState(this.state.currentGroup, this.state.totalAnswers);
      }, 500);
      this.updateCounter();
    }

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === this.status[0] || this.status[1]) {
        return;
      }
    }

    if (this.state.counter !== 0 && this.state.counter
      % totalQuizInGroup(this.state.totalQuestions) === 0 && this.state.changeGroup) {
      this.setState(({ currentGroup }) => ({ currentGroup: currentGroup + 1 }));
    }

    if (e.target.id === this.state.idWords[this.state.activeCard]) {
      this.handleComplete();
      this.guessedWords(e.target.id, null, 'success');
      this.audioPlay(this.audioPath[0]);
    } else {
      this.handleMistake();
      this.handleHeart();
      this.guessedWords(e.target.id, 'error', 'success');
      this.audioPlay(this.audioPath[1]);
    }
  }

  render() {
    const {
      heartCount, volume, complete, mistake, translateWords, idWords,
      answerState, activeQuestion, isStarted, resultTitle, isFinished, audio,
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
        resultTitle={resultTitle}
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
