import React from 'react';
import PropTypes from 'prop-types';
import GamePageView from './GamePageView.jsx';
import data from '../../mockData';
import { shuffleArray, generateQuestionsArray, playAudio } from '../../../../helpers/functions';
import {
  soundSuccess,
  soundError,
} from '../../../../helpers/constants';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { handleClickNewGame } = this.props;
    this.handleClickNewGame = handleClickNewGame;
    this.state = {
      dataWords: data, // TODO API
      level: 0,
      questionList: [],
      errorAnswerArray: [],
      rightAnswerArray: [],
      isRightAnswer: false,
      isFalseAnswer: false,
    };
  }

  componentDidMount = () => {
    const { dataWords, maxLevel } = this.state;
    const { level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const answerArray = this.getAnswersArray(dataWords, questionList, level);
    this.setState({ questionList, answerArray });
  }

  getAnswersArray = (dataWords, questionList, level) => {
    const { numberLevel, numberAnswers } = this.props;
    if (dataWords && questionList.length !== 0 && numberLevel !== level) {
      const currentQuestion = questionList[level];
      const arrayWrongAnswer = shuffleArray(dataWords.filter((word) => (
        word.id !== currentQuestion.id)));
      const answerArray = shuffleArray(
        arrayWrongAnswer.slice(0, numberAnswers - 1).concat(currentQuestion),
      );
      return answerArray;
    } return null;
  }

  changeLevel = () => {
    const { dataWords, questionList } = this.state;
    let { level } = this.state;
    const { numberLevel } = this.props;
    if (level < numberLevel) {
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
      if (id === question.id) {
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
  numberAnswers: PropTypes.number,
};

export default GamePage;
