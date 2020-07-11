import React from 'react';
import EnglishPuzzleView from './EnglishPuzzleView.jsx';

class EnglishPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
    };
  }

  handleClickButtonStart = () => {
    this.setState({ isStart: true });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      isStart,
    } = this.state;
    return (
      <EnglishPuzzleView
        isStart={isStart}
        handleClickButtonStart={this.handleClickButtonStart}
        handleClickNewGame={this.handleClickNewGame}
      />
    );
  }
}

export default EnglishPuzzle;
