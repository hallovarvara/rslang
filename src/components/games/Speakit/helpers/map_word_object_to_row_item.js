import React from 'react';

import { apiLinks } from './constants';
import { playAudio } from '../../../../helpers/functions';

const mapWordObjectToRowItem = (wordObj) => {
  const {
    id,
    audio: audioSrc,
    word,
    transcription,
    wordTranslate: translation,
  } = wordObj;

  const audioPath = apiLinks.file + audioSrc;

  return (
    <div key={id} onClick={() => playAudio(audioPath)} className="word-card-row">
      <span className="word-card-row__image"></span>
      <span className="word-card-row__word-eng">{word}</span>
      <span className="word-card-row__word-transcription">{transcription}</span>
      <span className="word-card-row__word-ru">{translation}</span>
    </div>
  );
};

export default mapWordObjectToRowItem;
