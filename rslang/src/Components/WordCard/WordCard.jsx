import React from 'react';

function WordCardView(props) {
  const { wordData, playSound, restoreWord } = props;

  const onPlaySound = () => {
    playSound();
  }

  const onRestoreWord = () => {
    restoreWord(wordData.id);
  }

  return (
    <div className="word-card-container">
      <div className="word-card-preview-wrapper">
        <div className="word-card-preview">
          <img className="word-card-preview__img" src = { wordData.image } alt="word"></img>
          <div className="word-card-main-info">
            <div className="target-word-wrapper">
              <p className="target-word-wrapper__word">{ wordData.word }</p>
              <p className="target-word-wrapper__translation">{ wordData.wordTranslate }</p>
            </div>
            <button className="word-card-main-info__pronunciation-button" onClick={() => onPlaySound()}></button>
          </div>
        </div>
        <button className="word-card-preview-wrapper__restore-button" onClick={() => onRestoreWord()}>Restore for learning</button>
      </div>
      <div className="word-card-additional-info">
        <p className="word-card-additional-info__transciption">{`/ ${wordData.transcription} /`}</p>
        <p className="word-card-additional-info__meaning">{ wordData.textMeaning }</p>
        <p className="word-card-additional-info__example-sentence">{ wordData.textExample }</p>
      </div>
    </div>
  )
}

export default WordCardView;
