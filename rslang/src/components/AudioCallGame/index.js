import React from 'react';
import AudioCallView from './AudioCall.jsx';
import { getWords } from '../../helpers/wordsService/wordsApi';

class AudioCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberLevel: 0,
      numberPage: 0,
      levelAPI: 0,
      countQuestions: 5,
      countAnswers: 5,
      isStart: false,
    };
  }

  getLevel = (group) => {
    this.setState({
      numberLevel: group,
    });
  }

  getPage = (page) => {
    this.setState({
      numberPage: page,
    });
  }

  handleChooseLevel = (e) => {
    const levelAPI = e.target.value;
    this.setState({ levelAPI: +levelAPI });
  }

  setNumberLevel = (e) => {
    const amountQuestions = e.target.value || e.target.defaultValue;
    console.log(amountQuestions, 78999999)
    this.setState({ countQuestions: +amountQuestions });
  }

  setcountAnswers = (e) => {
    const countAnswers = e.target.value || e.target.defaultValue;
    this.setState({ countAnswers: +countAnswers });
  }

  handleSubmitForm = async () => {
    const { numberPage, numberLevel } = this.state;
    const data = await getWords(numberPage, numberLevel);
    console.log(data, 4444);
    this.setState({
      data,
      isStart: true
     });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      countAnswers,
      isStart,
      countQuestions,
      numberLevel,
      numberPage,
      data,
    } = this.state;
    return (
      <AudioCallView
        data={data}
        getLevel={this.getLevel}
        getPage={this.getPage}
        numberPage={numberPage}
        numberLevel={numberLevel}
        handleChooseLevel={this.handleChooseLevel}
        handleClickNewGame={this.handleClickNewGame}
        setNumberLevel={this.setNumberLevel}
        setcountAnswers={this.setcountAnswers}
        handleSubmitForm={this.handleSubmitForm}
        countQuestions={countQuestions}
        countAnswers={countAnswers}
        isStart={isStart}
      />
    );
  }
}

export default AudioCall;

