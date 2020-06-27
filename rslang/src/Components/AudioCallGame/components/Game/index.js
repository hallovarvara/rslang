import React from 'react';
import GameView from './GameView.jsx';
import data from '../../mockData';
import { shuffle, generateQuestionsArray } from '../../helpers';

class Game extends React.Component {
  state = {
    dataWords: data, // TODO API
    level: 0,
    numberLevel: 12, // TODO: use settings
    numberAnswers: 5, // TODO: use settings
    questionList: [],
    errorAnswerArray: [],
    rightAnswerArray: [],
    isRightAnswer: false,
    isFalseAnswer: false,
    isClickable: true,
  }

  componentDidMount() {
    const { dataWords, maxLevel, level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const answerArray = this.getAnswersArray(dataWords, questionList, level);
    this.setState({ questionList, answerArray });
  }

  getAnswersArray(dataWords, questionList, level) {
    const { numberLevel, numberAnswers } = this.state;
    if (dataWords && questionList.length !== 0 && numberLevel !== level) {
      const currentQuestion = questionList[level];
      const arrayWrongAnswer = shuffle(dataWords.filter((word) => (
        word.id !== currentQuestion.id)));
      const answerArray = shuffle(arrayWrongAnswer.slice(0, numberAnswers - 1).concat(currentQuestion));
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
        isClickable: true,
      });
    } else console.log('The end');
  }

  countError = () => {
    let { error } = this.state;
    error += 1;
    this.setState({ error });
  }

  handlerClickButton = (e) => {
    const { isRightAnswer } = this.state;
    e.preventDefault();
    this.changeLevel();
    if (!isRightAnswer) {
      this.countError();
    }
  }

  setRightAnswer = (rightAnswerArray, question, id) => {
    rightAnswerArray.push(question);
    this.setState({
      rightAnswerArray: [...rightAnswerArray],
      isRightAnswer: true,
      currentAnswerId: id,
      isClickable: false,
    });
  }

  setErrorAnswer = (errorAnswerArray, question, id) => {
    errorAnswerArray.push(question);
    this.setState({
      errorAnswerArray: [...errorAnswerArray],
      isFalseAnswer: true,
      currentAnswerId: id,
      isClickable: false,
    });
  }

  handlerClickAnswer = (id) => {
    const {
      questionList,
      level,
      isClickable,
      rightAnswerArray,
      errorAnswerArray,
    } = this.state;
    const question = questionList[level];
    if (isClickable) {
      if (id === question.id) {
        this.setRightAnswer(rightAnswerArray, question, id);
      } else {
        this.setErrorAnswer(errorAnswerArray, question, id);
      }
    }
  }

  render() {
    const {
      dataWords,
      questionList,
      level,
      numberLevel,
      isRightAnswer,
      isFalseAnswer,
      currentAnswerId,
      answerArray,
      isClickable,
      rightAnswerArray,
      errorAnswerArray,
    } = this.state;
    return (
      <GameView
        answerArray={answerArray}
        isClickable={isClickable}
        handlerClickAnswer = {this.handlerClickAnswer}
        dataWords={dataWords}
        questionsList={questionList}
        level={level}
        numberLevel={numberLevel}
        isRightAnswer={isRightAnswer}
        rightAnswerArray={rightAnswerArray}
        errorAnswerArray={errorAnswerArray}
        // changeLevel={this.changeLevel}
        // countError={this.countError}
        isFalseAnswer={isFalseAnswer}
        currentAnswerId={currentAnswerId}
        handlerClickButton={this.handlerClickButton}
      />
    );
  }
}

export default Game;
