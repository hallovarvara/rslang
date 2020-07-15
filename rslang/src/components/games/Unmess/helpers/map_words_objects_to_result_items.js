import React from 'react';

import { apiLinks } from '../../../../helpers/constants';
import { playAudio } from '../../../../helpers/functions';
import replaceTagInString from './remove_tag_from_string';

const mapWordsObjectsToItems = (wordObj, classesPrefix) => (
  <div
    onClick={() => playAudio(`${apiLinks.file}${wordObj.audioMeaning}`)}
    key={`${wordObj.id}-${classesPrefix}`}
    className={`${classesPrefix}-word-container`}>
    <span className={`${classesPrefix}-word-container__word`}>{wordObj.word}</span>
    <span className={`${classesPrefix}-word-container__definition`}>{
      replaceTagInString(wordObj.textMeaning, wordObj.word)
    }</span>
    <div className={`${classesPrefix}-word-container__audio-icon`}>
      <span className="audio-icon"></span>
    </div>
  </div>
);

export default mapWordsObjectsToItems;
