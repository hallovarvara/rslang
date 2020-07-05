import React from 'react';
import data from '../../mockData';
import { generateQuestionsArray } from '../../helpers';
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
    };
  }

  componentDidMount = () => {
    const { dataWords, maxLevel, level } = this.state;
    const questionList = generateQuestionsArray(dataWords, maxLevel);
    const phrasesArray = this.getPhraseArray(questionList);
    const currentPhrase = phrasesArray[level];
    this.setState({ questionList, phrasesArray, currentPhrase });
  }

  getPhraseArray = (questionList) => {
    const phrase = questionList.map((item) => item.textExample.split(' ').map((word) => word.replace(/<\/?[^>]+>/gi, '')));
    return phrase;
  }

  render() {
    const { questionList, level, phrasesArray } = this.state;
    return (
      <GamePageView
        questionList={questionList}
        level={level}
        phrasesArray={phrasesArray}
      />
    );
  }
}

export default GamePage;
