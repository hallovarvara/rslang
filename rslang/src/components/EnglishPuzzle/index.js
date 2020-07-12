import React from 'react';
import { replaseUrlBackground, paintingObj } from './helpers';
import EnglishPuzzleView from './EnglishPuzzleView.jsx';

class EnglishPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paintingInfo: paintingObj(), // TODO level from form
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
    const { isBackground, paintingInfo } = this.state;
    this.setState({
      isStart: true,
      paintingInfo: paintingObj(),
      backgroundUrl: replaseUrlBackground(paintingInfo, isBackground),
    });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      isStart,
      backgroundUrl,
      isBackground,
      paintingInfo,
    } = this.state;
    return (
      <EnglishPuzzleView
        paintingInfo={paintingInfo}
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
