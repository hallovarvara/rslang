import React from 'react';
import PropTypes from 'prop-types';
import data from '../../mockData';
import { generateQuestionsArray, shuffle } from '../../helpers';
import GamePageView from './GamePageView.jsx';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const {
      handleClickNewGame, backgroundUrl, handleClickButtonBackground, paintingInfo,
    } = this.props;
    this.paintingInfo = paintingInfo;
    this.handleClickNewGame = handleClickNewGame;
    this.backgroundUrl = backgroundUrl;
    this.handleClickButtonBackground = handleClickButtonBackground;
    this.state = {
      level: 0,
      maxLevel: 10, // TODO Settings
      dataWords: data, // TODO use API
      questionList: [],
      phrasesArray: [],
      prevPhraseArray: [],
      isTranslation: true,
      isAudio: true,
      isAutoPlay: false,
      errorCount: 0,
      isContinue: false,
      isShow: false,
      isEnd: false,
    };
  }

  componentDidMount = () => {
    const { dataWords, maxLevel, level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const phrasesArray = this.getPhraseArray(questionList);
    const currentPhrase = phrasesArray[level];
    const answerItems = this.getItems(currentPhrase);
    const puzzleItems = shuffle(this.getItems(currentPhrase));
    this.setState({
      answerItems,
      questionList,
      phrasesArray,
      currentPhrase,
      puzzleItems,
    });
  }

  getPhraseArray = (questionList) => {
    const phrase = questionList.map((item) => item.textExample.split(' ').map((word) => word.replace(/<\/?[^>]+>/gi, '')));
    return phrase;
  }

  getItems = (array) => array.map((word, index) => ({
    id: `${index}`,
    content: `${word}`,
  }));

  handleClickButtonTranslation = () => {
    const { isTranslation } = this.state;
    this.setState({
      isTranslation: !isTranslation,
    });
  }

  handleClickButtonAudio = () => {
    const { isAudio } = this.state;
    this.setState({
      isAudio: !isAudio,
    });
  }

  handleClickButtonAutoPlay = () => {
    const { isAutoPlay } = this.state;
    this.setState({
      isAutoPlay: !isAutoPlay,
    });
  }

  handleClickButtonContinue = () => {
    let { level } = this.state;
    const { phrasesArray, prevPhraseArray } = this.state;
    const prevPhrase = phrasesArray[level];
    prevPhraseArray.push(prevPhrase);
    level += 1;
    if (level < 10) {
      const currentPhrase = phrasesArray[level];
      const answerItems = this.getItems(currentPhrase);
      const puzzleItems = shuffle(this.getItems(currentPhrase));
      this.setState({
        level,
        currentPhrase,
        puzzleItems,
        answerItems,
        isContinue: false,
        isCheck: false,
        isShow: false,
        prevPhraseArray,
      });
    } else {
      this.setState({
        isEnd: true,
      });
    }
  }

  updateIsCheck = (check) => {
    if (check) {
      this.setState({
        isContinue: true,
      });
    }
  }

  updateIsShow = () => {
    this.setState({ isShow: true });
  }

  handleClickCheck = () => {
    this.setState({ isCheck: true });
  }

  handleClickButtonDontKnow = () => {
    let { errorCount } = this.state;
    errorCount += 1;
    this.setState({
      errorCount,
    });
    this.handleClickButtonContinue();
  }

  render() {
    const {
      questionList,
      level,
      phrasesArray,
      isTranslation,
      isAudio,
      isAutoPlay,
      puzzleItems,
      answerItems,
      isContinue,
      errorCount,
      prevPhraseArray,
      isCheck,
      isShow,
      isEnd,
    } = this.state;
    return (
      <GamePageView
        paintingInfo={this.paintingInfo}
        questionList={questionList}
        level={level}
        phrasesArray={phrasesArray}
        handleClickButtonTranslation={this.handleClickButtonTranslation}
        handleClickButtonAudio={this.handleClickButtonAudio}
        handleClickButtonAutoPlay={this.handleClickButtonAutoPlay}
        handleClickButtonBackground={this.handleClickButtonBackground}
        handleClickButtonDontKnow={this.handleClickButtonDontKnow}
        isTranslation={isTranslation}
        isBackground={this.props.isBackground}
        isAudio={isAudio}
        isAutoPlay={isAutoPlay}
        puzzleItems={puzzleItems}
        answerItems={answerItems}
        handleClickButtonContinue={this.handleClickButtonContinue}
        isContinue={isContinue}
        isCheck={isCheck}
        errorCount={errorCount}
        prevPhraseArray={prevPhraseArray}
        handleClickCheck={this.handleClickCheck}
        isShow={isShow}
        updateIsCheck={this.updateIsCheck}
        updateIsShow={this.updateIsShow}
        handleClickNewGame={this.handleClickNewGame}
        isEnd={isEnd}
        backgroundUrl={this.backgroundUrl}
      />
    );
  }
}

GamePage.propTypes = {
  handleClickNewGame: PropTypes.func,
  backgroundUrl: PropTypes.string,
  handleClickButtonBackground: PropTypes.func,
  paintingInfo: PropTypes.object,
  isBackground: PropTypes.bool,
};

export default GamePage;
