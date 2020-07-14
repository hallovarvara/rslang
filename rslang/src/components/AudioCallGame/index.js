import React from 'react';
import AudioCallView from './AudioCall.jsx';

class AudioCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberLevel: 0,
      numberPage: 0,
      levelAPI: 0,
      // numberLevel: 5,
      numberAnswers: 5,
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
    this.setState({ numberLevel: +amountQuestions });
  }

  setNumberAnswers = (e) => {
    const numberAnswers = e.target.value || e.target.defaultValue;
    this.setState({ numberAnswers: +numberAnswers });
  }

  handleSubmitForm = () => {
    this.setState({ isStart: true });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      // levelAPI, // TODO for ARI
      numberAnswers,
      isStart,
      numberLevel,
      numberPage,
    } = this.state;
    return (
      <AudioCallView
        getLevel={this.getLevel}
        getPage={this.getPage}
        numberPage={numberPage}
        numberLevel={numberLevel}
        handleChooseLevel={this.handleChooseLevel}
        handleClickNewGame={this.handleClickNewGame}
        setNumberLevel={this.setNumberLevel}
        setNumberAnswers={this.setNumberAnswers}
        handleSubmitForm={this.handleSubmitForm}
        // levelAPI={levelAPI} // TODO for API
        numberAnswers={numberAnswers}
        isStart={isStart}
      />
    );
  }
}

export default AudioCall;

