import React from 'react';
import { replaseUrlBackground, paintingObj } from './helpers';
import EnglishPuzzleView from './EnglishPuzzleView.jsx';
import { getWords } from '../../helpers/wordsService/wordsApi';

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

  getLevel = (group) => {
    this.setState({
      numberLevel: group,
    });
  }

  handleClickButtonBackground = () => {
    const { isBackground } = this.state;
    this.setState({ isBackground: !isBackground });
  }

  handleClickButtonStart = async () => {
    const { isBackground, paintingInfo, numberLevel = 1 } = this.state;
    const data = await getWords(1, numberLevel);
    this.setState({
      data,
      isStart: true,
      paintingInfo: paintingObj(numberLevel),
      backgroundUrl: replaseUrlBackground(paintingInfo, isBackground),
    });
  }

  handleClickNewGame = () => {
    this.setState({ isStart: false });
  }

  render() {
    const {
      data,
      isStart,
      backgroundUrl,
      isBackground,
      paintingInfo,
      numberLevel,
    } = this.state;
    return (
      <EnglishPuzzleView
        data={data}
        paintingInfo={paintingInfo}
        backgroundUrl={backgroundUrl}
        isStart={isStart}
        isBackground={isBackground}
        handleClickButtonStart={this.handleClickButtonStart}
        handleClickButtonBackground={this.handleClickButtonBackground}
        handleClickNewGame={this.handleClickNewGame}
        getLevel={this.getLevel}
        numberLevel={numberLevel}
      />
    );
  }
}

export default EnglishPuzzle;
