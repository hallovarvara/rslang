import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import { apiLinks, text } from '../../../../helpers/constants';
import { removeTag, playAudio } from '../../../../helpers/functions';

const WordCardView = ({ wordData, restoreWord }) => {
  const onRestoreWord = () => {
    restoreWord(wordData.id);
  };

  return (
    <div className="word-card-container">
      <div className="word-card-preview-wrapper">
        <div className="word-card-preview">
          <img className="word-card-preview__img" src={`${apiLinks.file}${wordData.image}`} alt="word" />
          <div className="word-card-main-info">
            <div className="target-word-wrapper">
              <p className="target-word-wrapper__word" title={wordData.word}>{wordData.word}</p>
              <p className="target-word-wrapper__translation" title={wordData.wordTranslate}>{wordData.wordTranslate}</p>
            </div>
            <button className="word-card-main-info__pronunciation-button" onClick={() => playAudio(`${apiLinks.file}${wordData.audio}`)}></button>
          </div>
        </div>
        <button className="word-card-preview-wrapper__restore-button" onClick={onRestoreWord}>{text.ru.restoreForLearning}</button>
      </div>
      <div className="word-card-additional-info">
        <p className="word-card-additional-info__transciption" title={`/ ${wordData.transcription} /`}>{`/ ${wordData.transcription} /`}</p>
        <p className="word-card-additional-info__meaning" title={removeTag(wordData.textMeaning)}>{Parser(wordData.textMeaning)}</p>
        <p className="word-card-additional-info__example-sentence" title={removeTag(wordData.textExample)}>{Parser(wordData.textExample)}</p>
      </div>
    </div>
  );
};

WordCardView.propTypes = {
  restoreWord: PropTypes.func,
  wordData: PropTypes.object,
};

export default WordCardView;
