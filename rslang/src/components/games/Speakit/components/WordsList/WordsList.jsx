import React from 'react';
import PropTypes from 'prop-types';

import WordItem from '../WordItem';
import { withLocalStorageService } from '../../../hoc';

const mapWordObjToItem = (wordObj, currentActiveWordsChanged, currentActiveWords) => {
  const isActive = currentActiveWords.includes(wordObj);

  return (
    <WordItem
      isActive={isActive}
      onClick={() => currentActiveWordsChanged(wordObj, true)}
      key={wordObj.id}
      wordObj={wordObj} />
  );
};

class WordsList extends React.Component {
  render() {
    const { words, currentActiveWordsChanged, currentActiveWords } = this.props;

    return (
      <div className="words-container">
      {
      words
        .map((wordObj) => mapWordObjToItem(wordObj, currentActiveWordsChanged, currentActiveWords))
      }
      </div>
    );
  }
}

WordsList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  currentActiveWordsChanged: PropTypes.func,
  currentActiveWords: PropTypes.array,
  isGameInProcess: PropTypes.bool,
};

export default withLocalStorageService()(WordsList);
