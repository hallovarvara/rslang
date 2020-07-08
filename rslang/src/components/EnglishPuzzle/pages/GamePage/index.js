import React from 'react';
import data from '../../mockData';
import { generateQuestionsArray, shuffle } from '../../helpers';
import GamePageView from './GamePageView.jsx';
// import { CompareArrowsOutlined } from '@material-ui/icons';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
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
    };
  }

  componentDidMount = () => {
    const { dataWords, maxLevel, level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const phrasesArray = this.getPhraseArray(questionList);
    const currentPhrase = phrasesArray[level];
    const puzzleItems = shuffle(this.getItems(currentPhrase));
    this.setState({
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
      prevPhraseArray,
    });
  }

  handleClickCheck = (array) => {
    const check = array.every((item, index) => +item.id === index);
    if (check) {
      this.setState({
        isCheck: true,
        isContinue: true,
      });
    } else this.setState({ isCheck: true });
  }

  handleClickButtonDontKnow = () => {
    let { errorCount } = this.state;
    const { phrasesArray, level } = this.state;
    errorCount += 1;
    const currentPhrase = phrasesArray[level];
    const answerItems = this.getItems(currentPhrase);
    this.setState({ errorCount, answerItems, isContinue: true });
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
    } = this.state;
    console.log(level)
    return (
      <GamePageView
        questionList={questionList}
        level={level}
        phrasesArray={phrasesArray}
        handleClickButtonTranslation={this.handleClickButtonTranslation}
        handleClickButtonAudio={this.handleClickButtonAudio}
        handleClickButtonAutoPlay={this.handleClickButtonAutoPlay}
        handleClickButtonDontKnow={this.handleClickButtonDontKnow}
        isTranslation={isTranslation}
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
      />
    );
  }
}

export default GamePage;
