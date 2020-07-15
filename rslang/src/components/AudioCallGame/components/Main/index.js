import React from 'react';
import MainView from './MainView.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelAPI: 0,
      numberLevel: 5,
      countAnswers: 5,
      isStart: false,
    };
  }

  handleChooseLevel = (e) => {
    const levelAPI = e.target.value;
    this.setState({ levelAPI: +levelAPI });
  }

  setNumberLevel = (e) => {
    const amountQuestions = e.target.value || e.target.defaultValue;
    this.setState({ numberLevel: +amountQuestions });
  }

  setcountAnswers = (e) => {
    const countAnswers = e.target.value || e.target.defaultValue;
    this.setState({ countAnswers: +countAnswers });
  }

  handleSubmitForm = () => {
    this.setState({ isStart: true });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      levelAPI, // TODO for ARI
      countAnswers,
      isStart,
      numberLevel,
    } = this.state;
    return (
      <MainView
        handleChooseLevel={this.handleChooseLevel}
        handleClickNewGame={this.handleClickNewGame}
        setNumberLevel={this.setNumberLevel}
        setcountAnswers={this.setcountAnswers}
        handleSubmitForm={this.handleSubmitForm}
        levelAPI={levelAPI} // TODO for API
        countAnswers={countAnswers}
        isStart={isStart}
        numberLevel={numberLevel}
      />
    );
  }
}

export default Main;
