import React from 'react';
import PropTypes from 'prop-types';
import GamePageView from './GamePageView.jsx';
import { shuffleArray, generateQuestionsArray, playAudio } from '../../../../helpers/functions';
import {
  soundSuccess,
  soundError,
} from '../../../../helpers/constants';

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
    };
  }

  componentDidMount = () => {
    const { dataWords, countQuestions } = this.state;
    console.log(countQuestions)
    const { level } = this.state;
    const questionList = generateQuestionsArray(dataWords, countQuestions);
    console.log(dataWords, questionList, level)
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
        playAudio(soundSuccess);
        this.nextLevel = setTimeout(this.changeLevel, 2000);
      } else {
        this.setAnswer(errorAnswerArray, question, id);
        this.setState({ isFalseAnswer: true });
        playAudio(soundError);
        this.nextLevel = setTimeout(this.changeLevel, 2000);
      }
    }
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
    } = this.state;
    return (
      <GamePageView
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
};

export default GamePage;
