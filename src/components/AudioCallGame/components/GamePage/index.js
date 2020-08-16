import React from 'react';
import PropTypes from 'prop-types';
import GamePageView from './GamePageView.jsx';
import { shuffleArray, generateQuestionsArray, playAudio } from '../../../../helpers/functions';

import {
  soundSuccess,
  soundError,
  applicationThings,
  dateOptions,
} from '../../../../helpers/constants';

import {
  handleGameRightAnswer,
  handleGameWrongAnswer,
} from '../../../../helpers/wordsService';

import { localStorageItems, countLatestResult } from '../../constants';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { handleClickNewGame, data, countQuestions } = this.props;
    this.handleClickNewGame = handleClickNewGame;
    this.state = {
      countQuestions,
      dataWords: data,
      level: 0,
      questionList: [],
      errorAnswerArray: [],
      rightAnswerArray: [],
      isRightAnswer: false,
      isFalseAnswer: false,
      statistic: localStorage.getItem('rslangAudioCallLatestResults') || [],
      isStatisticShow: false,
    };
  }

  componentDidMount = () => {
    const { dataWords, countQuestions } = this.state;
    const { level } = this.state;
    const questionList = generateQuestionsArray(dataWords, countQuestions);
    const answerArray = this.getAnswersArray(dataWords, questionList, level);
    this.setState({ questionList, answerArray });
  }

  getAnswersArray = (dataWords, questionList, level) => {
    const { countQuestions, countAnswers } = this.props;
    if (dataWords && questionList.length !== 0 && countQuestions !== level) {
      const currentQuestion = questionList[level];
      const arrayWrongAnswer = shuffleArray(dataWords.filter((word) => (
        (word.id || word._id) !== (currentQuestion.id || currentQuestion._id))));
      const answerArray = shuffleArray(
        arrayWrongAnswer.slice(0, countAnswers - 1).concat(currentQuestion),
      );
      return answerArray;
    } return null;
  }

  changeLevel = () => {
    const { dataWords, questionList } = this.state;
    let { level } = this.state;
    const { countQuestions } = this.props;
    if (level < countQuestions) {
      level += 1;
      const answerArray = this.getAnswersArray(dataWords, questionList, level);
      clearTimeout(this.nextLevel);
      this.setState({
        level,
        isRightAnswer: false,
        isFalseAnswer: false,
        answerArray,
      });
    } 
    if (level === countQuestions) {
      this.updateLatestResult();
    }
  }

  handleShowStatistic = () => {
    const { isStatisticShow } = this.state;
    this.setState({ isStatisticShow: !isStatisticShow });
  }

  handleClickButton = (e) => {
    const {
      isRightAnswer,
      isFalseAnswer,
      errorAnswerArray,
      questionList,
      level,
      id,
    } = this.state;
    e.preventDefault();
    const question = questionList[level];
    if (!isRightAnswer && !isFalseAnswer) {
      this.setAnswer(errorAnswerArray, question, id);
      playAudio(soundError);
      this.nextLevel = setTimeout(this.changeLevel, 2000);
    } else this.changeLevel();
  }

  setAnswer = (array, question, id) => {
    array.push(question);
    this.setState({
      array: [...array],
      isRightAnswer: true,
      currentAnswerId: id,
    });
  }

  handleClickAnswer = (id) => {
    const {
      questionList,
      level,
      isRightAnswer,
      isFalseAnswer,
      rightAnswerArray,
      errorAnswerArray,
    } = this.state;
    const question = questionList[level];
    if (!isRightAnswer && !isFalseAnswer) {
      if (id === (question._id || question.id)) {
        this.setAnswer(rightAnswerArray, question, id);
        this.setState({ isRightAnswer: true });
        handleGameRightAnswer(applicationThings.AUDIOCALL, question)
        playAudio(soundSuccess);
        this.nextLevel = setTimeout(this.changeLevel, 2000);
      } else {
        this.setAnswer(errorAnswerArray, question, id);
        this.setState({ isFalseAnswer: true });
        handleGameWrongAnswer(applicationThings.AUDIOCALL, question);
        playAudio(soundError);
        this.nextLevel = setTimeout(this.changeLevel, 2000);
      }
    }
  }

  updateLatestResult = () => {
    const { latestResults } = localStorageItems;
    const { errorAnswerArray, rightAnswerArray } = this.state; 
    const result = {
      date: (new Date()).toLocaleString('ru', dateOptions),
      error: errorAnswerArray,
      right: rightAnswerArray,
    };
    if(!localStorage.getItem(latestResults)) {
      localStorage.setItem(latestResults, JSON.stringify([]));
    };
    this.latestResult = JSON.parse(localStorage.getItem(latestResults));
    this.latestResult.unshift(result);
    if (this.latestResult.length > countLatestResult) {
      this.latestResult = this.latestResult.slice(0, countLatestResult);
    }
    localStorage.setItem(latestResults, JSON.stringify(this.latestResult));
  }

  render() {
    const {
      questionList,
      level,
      isRightAnswer,
      isFalseAnswer,
      currentAnswerId,
      answerArray,
      rightAnswerArray,
      errorAnswerArray,
      statistic,
      isStatisticShow,
    } = this.state;

    return (
      <GamePageView
        isStatisticShow={isStatisticShow}
        statistic={statistic}
        handleShowStatistic={this.handleShowStatistic}
        handleClickNewGame={this.handleClickNewGame}
        answerArray={answerArray}
        handleClickAnswer = {this.handleClickAnswer}
        questionsList={questionList}
        level={level}
        isRightAnswer={isRightAnswer}
        rightAnswerArray={rightAnswerArray}
        errorAnswerArray={errorAnswerArray}
        isFalseAnswer={isFalseAnswer}
        currentAnswerId={currentAnswerId}
        handleClickButton={this.handleClickButton}
      />
    );
  }
}

GamePage.propTypes = {
  handleClickNewGame: PropTypes.func,
  numberLevel: PropTypes.number,
  countAnswers: PropTypes.number,
  data: PropTypes.array,
  countQuestion: PropTypes.number,
};

export default GamePage;
