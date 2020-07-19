import React from 'react';
import { RSLANG_SESSION_PROGRESS } from './constants';
import { successColor, fewErrorsColor, manyErrorsColor } from './style-options';
import { apiLinks } from '../../../../helpers/constants';

export const resourceUrl = (path) => `${apiLinks.file}${path}`;

export const extractEmphasizedWord = (str, surroundingTag) => {
  const sentence = {};
  const beginTag = `<${surroundingTag}>`;
  const endTag = `</${surroundingTag}>`;

  if (str) {
    sentence.begin = str.substring(0, str.indexOf(beginTag));
    sentence.emphasis = str.substring(
      str.indexOf(beginTag) + 3,
      str.indexOf(endTag),
    );
    sentence.end = str.substring(str.indexOf(endTag) + 4);
  }
  return sentence || '';
};

export const showDifferenceInWords = (currentWord, inputWord) => {
  const result = [];
  const errorsCounter = 0;
  const arr = inputWord.split('');
  arr.forEach((el, i) => {
    if (el === currentWord[i]) {
      result.push({ letter: el, color: successColor });
    } else {
      const errorColor = errorsCounter >= arr.length
        ? manyErrorsColor
        : fewErrorsColor;
      result.push({ letter: el, color: errorColor });
    }
  });
  return result;
};

export const getSessionProgress = () => {
  const progress = JSON.parse(localStorage.getItem(RSLANG_SESSION_PROGRESS));
  return progress || [];
};

export const setSessionProgress = (progress) => {
  localStorage.setItem(RSLANG_SESSION_PROGRESS, JSON.stringify(progress));
};

export const updateSessionProgress = (wordObject) => {
  const words = JSON.parse(localStorage.getItem(RSLANG_SESSION_PROGRESS));
  // console.log(words);
  if (words) {
    const idTemplate = '_id';
    const updated = words.map(
      (el) => (el.id === wordObject?.id || el.id === wordObject[idTemplate] ? wordObject : el),
    );
    localStorage.setItem(RSLANG_SESSION_PROGRESS, JSON.stringify(updated));
  }
};

export const checkSessionProgress = (words) => {
  const result = words.find((el) => !el.progress.isGuessed);
  // console.log(result);
  return result;
};

export const clearSessionProgress = () => {
  localStorage.removeItem(RSLANG_SESSION_PROGRESS);
};

export const prepareRightAnswerStyles = (isGuessed) => {
  const styles = {};
  styles.zIndex = 8;
  styles.color = isGuessed ? successColor : 'transparent';
  return styles;
};

export const prepareWrongAnswerStyles = (isShownWord, isWordSemiOpacity) => {
  const styles = {
    display: 'inline',
    transition: 'all 0.5s ease',
  };
  if (isShownWord) {
    styles.opacity = !isWordSemiOpacity ? 1 : 0.5;
  } else {
    styles.opacity = 0;
  }
  return styles;
};

class AudioPlayer {
  constructor() {
    this.current = new Audio();
    this.tracks = null;
  }

  playAudios = (audios) => {
    if (!Array.isArray(audios)) {
      this.current.src = resourceUrl(audios);
      this.current.play();
      this.current.onended = () => {
        this.current.src = null;
      };
    } else {
      this.tracks = [...audios];
      let index = 0;
      this.current.src = resourceUrl(this.tracks[index]);
      this.current.play();

      this.current.onended = () => {
        if (index < this.tracks.length - 1) {
          setTimeout(() => {
            index += 1;
            if (this.tracks[index]) {
              this.current.src = resourceUrl(this.tracks[index]);
              this.current.play();
            }
          }, 300);
        }
      };
    }
  }

  stopAudios = () => {
    this.current.pause();
    this.current.src = null;
    this.tracks = null;
  }
}

export const audioplayer = new AudioPlayer();

export const calculatePrevWordCard = (words, current) => {
  let result;
  let start;
  if (current && current !== words.length) {
    const leftChunk = words.slice(0, current);
    start = leftChunk.find((el) => !el.isDifficultChosen)
      ? current - 1
      : words.length - 1;
  } else {
    start = words.length - 1;
  }
  for (let i = start; i >= 0; i - 1) {
    if (!words[i].isDifficultChosen) {
      result = i;
      break;
    }
  }
  return result;
};

export const calculateNextWordCard = (words, current) => {
  let result;
  let start;
  if (current && current !== words.length) {
    const rightChunk = words.slice(current + 1, words.length);
    start = rightChunk.find((el) => !el.isDifficultChosen) ? current + 1 : 0;
  } else {
    start = 0;
  }
  for (let i = start; i < words.length; i + 1) {
    if (!words[i].isDifficultChosen) {
      result = i;
      break;
    }
  }
  return result;
};

export const mapSentenceToSpanItems = (sentence) => (
  sentence.split(' ').map((word, index) => <span key={index}>{word}</span>)
);

export const replaceElInArrayOfObject = (array, object) => {
  const indexOfObject = array.findIndex((wordObj) => (
    wordObj.id === object.id
  ));

  return [
    ...array.slice(0, indexOfObject),
    { ...object },
    ...array.slice(indexOfObject + 1),
  ].map((wordObj) => ({ ...wordObj }));
};
