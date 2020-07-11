import React from 'react';
import { replaseUrlBackground } from './helpers';
import EnglishPuzzleView from './EnglishPuzzleView.jsx';

class EnglishPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      backgroundUrl: '',
      isBackground: true,
    };
  }

  handleClickButtonBackground = () => {
    const { isBackground } = this.state;
    this.setState({ isBackground: !isBackground });
  }

  handleClickButtonStart = () => {
    const { isBackground } = this.state;
    this.setState({ isStart: true, backgroundUrl: replaseUrlBackground(1, isBackground) }); //TODO level from form
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      isStart,
      backgroundUrl,
      isBackground,
    } = this.state;
    return (
      <EnglishPuzzleView
        backgroundUrl={backgroundUrl}
        isStart={isStart}
        isBackground={isBackground}
        handleClickButtonStart={this.handleClickButtonStart}
        handleClickButtonBackground={this.handleClickButtonBackground}
        handleClickNewGame={this.handleClickNewGame}
      />
    );
  }
}

export default EnglishPuzzle;
