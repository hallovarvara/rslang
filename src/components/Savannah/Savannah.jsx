import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import StartPage from './components/StartPage';
import FinishPage from './components/FinishPage';
import ActiveQuiz from './components/ActiveQuiz';
import UserService from '../../helpers/userService';

import {
  questionStatus, count,
  text, localStorageItems, applicationThings,
  soundFinish, soundSuccess, soundError,
} from '../../helpers/constants';

import {
  countQuestionsSets,
  getRandomNumber,
  playAudio,
  shuffleArray,
  getAverageNumber,
} from '../../helpers/functions';

import {
  handleGameRightAnswer,
  handleGameWrongAnswer,
  saveSessionInfoToLocal,
} from '../../helpers/wordsService';

import { getWordsByAmount } from '../../helpers/wordsService/wordsApi';

import classes from './Savannah.module.scss';

const {
  defaultLevel, minQuestions, maxQuestions, minAnswers, maxAnswers,
} = count.savannah;
const totalQuestionsState = getAverageNumber(minQuestions, maxQuestions);
const totalAnswersState = getAverageNumber(minAnswers, maxAnswers);

const initialState = {
  currentUserWordId: '',
  wordObject: {},
  checkedUserWords: false,
  allUserWords: [],
  timer: 0,
  activeQuestion: '',
  activeCard: 0,
  audio: [],
  answerState: null,
  currentGroup: defaultLevel,
  counter: 1,
  changeGroup: false,
  idWords: [],
  isFinished: false,
  isStarted: false,
  totalAnswers: totalAnswersState,
  totalQuestions: totalQuestionsState,
  translateWords: [],
  volume: true,
  heartCount: 5,
  keyPressed: null,
  words: [],
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

class Savannah extends Component {
  status = questionStatus;

  resultTitle = {
    success: text.ru.answersCorrect,
    error: text.ru.answersMistaken,
  };

  state = JSON.parse(JSON.stringify(initialState))

  updateState = async () => {
    const words = [];
    const translateWords = [];
    const idWords = [];
    const answerState = null;
    const audio = [];
    try {
      const { counter, totalAnswers, allUserWords } = this.state;

      const { userId, token } = this.props;

      const isRegUser = (token || localStorage.getItem(localStorageItems.token))
        && this.state.checkedUserWords;

      let allUserWordsRandom = [];
      let currentUserWordId = null;
      let activeCard = null;

      if (isRegUser) {
        allUserWordsRandom = await getUserWordsNoRemoved(userId);
        currentUserWordId = allUserWordsRandom[counter - 1]?._id;
      }

      const resultArray = [
        allUserWordsRandom[counter - 1],
        ...await getWordsByAmount(2, totalAnswers - 1)
      ];

      if (!allUserWords.length) {
        this.setState({ allUserWords: allUserWordsRandom });
      }

      const allCards = (allUserWordsRandom.length + 1 > counter)
        ? shuffleArray(resultArray)
        : await getWordsByAmount(this.state.currentGroup, this.state.totalAnswers);

      allCards.forEach((card, key) => {
        words.push(card.word);
        translateWords.push(card.wordTranslate);
        idWords.push(card.id || card._id);
        audio.push(card.audio);
        if (isRegUser
          && card.word === allUserWords[counter - 1]?.word
          && allUserWordsRandom.length + 1 > counter
        ) {
          activeCard = key;
        }
      });
      if (allUserWords.length < counter) {
        activeCard = getRandomNumber(0, allCards.length - 1);
      }
      const wordObject = allCards[activeCard];

      const activeQuestion = isRegUser && allUserWords.length - 1 > counter
        ? resultArray[0].word

        : allCards[activeCard].word;

      this.setState({
        words,
        translateWords,
        idWords,
        answerState,
        activeCard,
        activeQuestion,
        audio,
        currentUserWordId,
        wordObject,
      });
    } catch (e) {
      console.log(e);
      // TODO handle error for showing user
    }
  }

  onTotalQuizUpdate = (e) => {
    this.setState({ totalQuestions: +e.target.value });
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
    this.playAudio(soundFinish);
    saveSessionInfoToLocal(applicationThings.SAVANNAH);
  }

  playAudio = (path) => this.state.volume && playAudio(path);

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

  handleCurrentGroup = (event) => {
    this.setState({ currentGroup: event.target.value, changeGroup: false });
  }

  handleTotalAnswer = (e) => {
    this.setState({ totalAnswers: Number(e.target.value) });
  }

  onClickHandler = () => {
    if (this.state.currentGroup !== null) {
      this.setState({ isStarted: true });
    }
    this.updateState();
  }

  onTimeOut = () => {
    this.setState(({ timer }) => ({
      timer: timer + 1,
    }));
  }

  gameStatus = (idWordPressed = 'default') => {
    if (this.state.counter === +this.state.totalQuestions) {
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
      % countQuestionsSets(this.state.totalQuestions) === 0 && this.state.changeGroup) {
      this.setState(({ currentGroup }) => ({ currentGroup: currentGroup + 1 }));
    }
  }

  onCorrectAnswer = (idWordPressed) => {

    const { idWords, activeCard } = this.state;

    if (idWordPressed === idWords[activeCard]) {
      this.resultCurrentQuiz('complete');
      this.guessedWords(idWordPressed, null, 'success');
      this.playAudio(soundSuccess);
      handleGameRightAnswer(applicationThings.SAVANNAH, this.state.wordObject);
    } else {
      this.resultCurrentQuiz('mistake');
      this.handleHeart();
      this.playAudio(soundError);
      this.guessedWords(idWordPressed, (!idWordPressed ? null : 'error'), 'success');
      handleGameWrongAnswer(applicationThings.SAVANNAH, this.state.wordObject);
    }
  }

  onAnswerClickHandler = (e) => {
    const keys = this.state.words;

    e.preventDefault();
    const { idWords, answerState } = this.state;
    this.setState({ timer: 0 });
    const idWordPressed = e.target.id || idWords[Number(e.key) - 1];

    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === this.status.error || this.status.success) {
        return;
      }
    }

    keys.forEach((value, key) => {
      if (Number(e.key) === key + 1) {
        this.gameStatus(idWordPressed);
        this.onChangeGroupwords();
        this.onCorrectAnswer(idWordPressed);
      }
    });

    if (e.target.id) {
      this.gameStatus(idWordPressed);
      this.onChangeGroupwords();
      this.onCorrectAnswer(idWordPressed);
    }
  }

  onDefault = () => {
    this.gameStatus();
    this.onChangeGroupwords();
    this.onCorrectAnswer();
    this.setState({ timer: 0 });
  }

  isChangeUserWords = () => {
    this.setState(({ checkedUserWords }) => ({
      checkedUserWords: !checkedUserWords,
    }));
  }

  newStartGameHandle = () => {
    const state = JSON.parse(JSON.stringify(initialState))
    this.setState({ ...state });
  }

  render() {
    const {
      heartCount, volume, complete, mistake, translateWords, idWords, timer,
      answerState, activeQuestion, isStarted, isFinished, audio, totalAnswers,
      totalQuestions
    } = this.state;

    let page;
    if (!isStarted) {
      page = <StartPage
        onTotalQuizUpdate={this.onTotalQuizUpdate}
        onSubmitForm={this.onClickHandler}
        handleCurrentGroup={this.handleCurrentGroup}
        handleTotalAnswer={this.handleTotalAnswer}
        handleChangeUserWords={this.isChangeUserWords}
        totalAnswers={totalAnswers}
        totalQuestions={totalQuestions}
      />;
    } else if (isStarted && isFinished) {
      page = <FinishPage
        complete={complete}
        mistake={mistake}
        resultTitle={this.resultTitle}
        status={this.status}
        pathAudio={audio}
        newStartGameHandle={this.newStartGameHandle}
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
          handleClose={this.handleClose}
          heartCount={heartCount}
        />
      </div>;
    }

    return (
      <div className={`.savannah ${classes.Savannah}`}>
        <div className={classes.Container}>
          {page}
          <div className="savannah__background"></div>
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

Savannah.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.string,
};
export default connect(mapStateToProps)(Savannah);
