import React from 'react';
import MainView from './MainView.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
    };
  }

  handleChooseLevel = (e) => {
    const level = e.target.value;
    this.setState({ level: +level });
  }

  setNumberLevel = (e) => {
    const amountQuestions = e.target.value;
    this.setState({ numberLevel: +amountQuestions });
  }

  setNumberAnswers = (e) => {
    const numberAnswers = e.target.value;
    this.setState({ numberAnswers: +numberAnswers });
  }

  handleSubmitForm = () => {
    this.setState({ isStart: true });
  }

  render() {
    const {
      level, // TODO for ARI
      numberAnswers,
      isStart,
      numberLevel,
    } = this.state;
    return (
      <MainView
        handleChooseLevel={this.handleChooseLevel}
        setNumberLevel={this.setNumberLevel}
        setNumberAnswers={this.setNumberAnswers}
        handleSubmitForm={this.handleSubmitForm}
        level={level} // TODO for API
        numberAnswers={numberAnswers}
        isStart={isStart}
        numberLevel={numberLevel}
      />
    );
  }
}

export default Main;
