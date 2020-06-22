import React from 'react';
import GameView from './GameView.jsx';
import data from '../mockData';
import { shuffle, generateQuestionsArray } from '../helpers';

class Game extends React.Component {
  state = {
    dataWords: data,
    level: 0,
    numberLevel: 12, // TODO: use settings
    question: [],
  }

  componentDidMount() {
    const { dataWords, maxLevel } = this.state;
    const questionsArray = generateQuestionsArray(dataWords, maxLevel);
    this.setState({ question: questionsArray });
  }

  getAnswersArray(dataWords, question, level) {
    const { errorCounter } = this.state;
    if (dataWords && question.length !== 0) {
      const arrayWrongAnswer = shuffle(dataWords.filter((word) => (
        word.id !== question[level].id)));
      const answerArray = shuffle(arrayWrongAnswer.slice(0, 4).concat(question[level]));
      return answerArray;
    } return console.log(errorCounter);
  }

  render() {
    const {
      dataWords,
      question,
      level,
      numberLevel,
    } = this.state;
    console.log(this.state);
    return (
      <GameView
        answerArray={this.getAnswersArray(dataWords, question, level)}
        dataWords={dataWords}
        question={question}
        level={level}
        numberLevel={numberLevel}
      />
    );
  }
}

export default Game;
