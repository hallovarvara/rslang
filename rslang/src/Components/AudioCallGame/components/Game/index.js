import React from 'react';
import GameView from './GameView.jsx';
import data from '../../mockData';
import { shuffle, generateQuestionsArray } from '../../helpers';

class Game extends React.Component {
  state = {
    dataWords: data,
    level: 0,
    numberLevel: 12, // TODO: use settings
    question: [],
    isRightAnswer: false,
    isFalseAnswer: true,
    error: 0,
  }

  componentDidMount() {
    const { dataWords, maxLevel } = this.state;
    const questionsArray = generateQuestionsArray(dataWords, maxLevel);
    this.setState({ question: questionsArray });
  }

  getAnswersArray(dataWords, question, level) {
    const { error, numberLevel } = this.state;
    if (dataWords && question.length !== 0 && numberLevel !== level) {
      const arrayWrongAnswer = shuffle(dataWords.filter((word) => (
        word.id !== question[level].id)));
      const answerArray = shuffle(arrayWrongAnswer.slice(0, 4).concat(question[level]));
      return answerArray;
    } return console.log(error, numberLevel, level);
  }

  changeLevel = () => {
    let { level } = this.state;
    const { numberLevel } = this.state;
    if (level < numberLevel) {
      this.setState({ level: level += 1 });
      this.setState({
        isRightAnswer: false,
        isFalseAnswer: false,
      });
    } else console.log('The end');
  }

  countError = () => {
    let { error } = this.state;
    error += 1;
    this.setState({ error });
  }

  render() {
    const {
      dataWords,
      question,
      level,
      numberLevel,
      isRightAnswer,
      isFalseAnswer,
      error,
    } = this.state;
    return (
      <GameView
        answerArray={this.getAnswersArray(dataWords, question, level)}
        dataWords={dataWords}
        question={question}
        level={level}
        numberLevel={numberLevel}
        isRightAnswer={isRightAnswer}
        changeLevel={this.changeLevel}
        countError={this.countError}
        isFalseAnswer={isFalseAnswer}
        error={error}
      />
    );
  }
}

export default Game;
