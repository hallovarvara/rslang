import React from 'react';
import PropTypes from 'prop-types';
import GamePageView from './GamePageView.jsx';
import data from '../../mockData';
import { shuffle, generateQuestionsArray, playAudio } from '../../helpers';
import { audio } from '../../constants';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    const { numberLevel, numberAnswers } = props;
    this.state = {
      dataWords: data, // TODO API
      level: 0,
      numberLevel, // TODO: use settings
      numberAnswers, // TODO: use settings
      questionList: [],
      errorAnswerArray: [],
      rightAnswerArray: [],
      isRightAnswer: false,
      isFalseAnswer: false,
    };
  }

  componentDidMount = () => {
    const { dataWords, maxLevel, level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const answerArray = this.getAnswersArray(dataWords, questionList, level);
    this.setState({ questionList, answerArray });
  }

  getAnswersArray = (dataWords, questionList, level) => {
    const { numberLevel, numberAnswers } = this.state;
    if (dataWords && questionList.length !== 0 && numberLevel !== level) {
      const currentQuestion = questionList[level];
      const arrayWrongAnswer = shuffle(dataWords.filter((word) => (
        word.id !== currentQuestion.id)));
      const answerArray = shuffle(
        arrayWrongAnswer.slice(0, numberAnswers - 1).concat(currentQuestion),
      );
      return answerArray;
    } return null;
  }

  changeLevel = () => {
    const { dataWords, questionList } = this.state;
    let { level } = this.state;
    const { numberLevel } = this.state;
    if (level < numberLevel) {
      level += 1;
      const answerArray = this.getAnswersArray(dataWords, questionList, level);
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
      this.setErrorAnswer(errorAnswerArray, question, id);
      playAudio(audio.error);
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
        playAudio(audio.sucsess);
      } else {
        this.setAnswer(errorAnswerArray, question, id);
        playAudio(audio.error);
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
  numberLevel: PropTypes.number,
  numberAnswers: PropTypes.number,
};

export default GamePage;
