import React from 'react';
import PropTypes from 'prop-types';
import {
  countPhrase,
  countLatestResult,
  localStorageItems,
} from '../../constants';
import { dateOptions } from '../../../../helpers/constants';
import { generateQuestionsArray, shuffle } from '../../helpers';
import GamePageView from './GamePageView.jsx';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const {
      handleClickNewGame,
      backgroundUrl,
      handleClickButtonBackground,
      paintingInfo,
      data,
    } = this.props;
    this.paintingInfo = paintingInfo;
    this.handleClickNewGame = handleClickNewGame;
    this.backgroundUrl = backgroundUrl;
    this.handleClickButtonBackground = handleClickButtonBackground;
    this.state = {
      level: 0,
      maxLevel: 10,
      dataWords: data,
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
      isStatisticShow: false,
      statistic: localStorage.getItem('rslangPuzzleLatestResults') || [],
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
    if (level < countPhrase) {
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
      }, this.updateLatestResult);
    }
  }

  updateLatestResult = () => {
    const { latestResults } = localStorageItems;
    const { errorCount } = this.state;
    const result = {
      date: (new Date()).toLocaleString('ru', dateOptions),
      error: errorCount,
      right: countPhrase - errorCount,
    };
    if (!localStorage.getItem(latestResults)) {
      localStorage.setItem(latestResults, JSON.stringify([]));
    }
    this.latestResult = JSON.parse(localStorage.getItem(latestResults));
    this.latestResult.unshift(result);
    if (this.latestResult.length > countLatestResult) {
      this.latestResult = this.latestResult.slice(0, countLatestResult);
    }
    localStorage.setItem(latestResults, JSON.stringify(this.latestResult));
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

  handleShowStatistic = () => {
    const { isStatisticShow } = this.state;
    this.setState({ isStatisticShow: !isStatisticShow });
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
      statistic,
      isStatisticShow,
    } = this.state;
    return (
      <GamePageView
        statistic={statistic}
        isStatisticShow={isStatisticShow}
        handleShowStatistic={this.handleShowStatistic}
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
        updateLatestResult={this.updateLatestResult}
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
  data: PropTypes.array,
};

export default GamePage;
