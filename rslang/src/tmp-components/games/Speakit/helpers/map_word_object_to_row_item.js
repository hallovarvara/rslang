import React from 'react';

import { apiLinks } from './constants';
import playAudio from '../../../../helpers/play_audio';

const mapWordObjectToRowItem = (wordObj) => {
  const {
    id,
    audio: audioSrc,
    word,
    transcription,
    wordTranslate: translation,
  } = wordObj;

  return (
    <div key={id} onClick={() => playAudio(`${apiLinks.file}${audioSrc}`)} className="word-card-row">
      <span className="word-card-row__image"></span>
      <span className="word-card-row__word-eng">{word}</span>
      <span className="word-card-row__word-transcription">{transcription}</span>
      <span className="word-card-row__word-ru">{translation}</span>
    </div>
  );
};

export default mapWordObjectToRowItem;
