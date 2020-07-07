import { baseUrl } from './settings';
import { RSLANG_SESSION_PROGRESS } from './constants';
import {
  successColor,
  fewErrorsColor,
  manyErrorsColor,
} from './style-options';

export const resourceUrl = (path) => (`${baseUrl}${path}`);

export const extractEmphasizedWord = (str, surroundingTag) => {
  const sentence = {};
  const beginTag = `<${surroundingTag}>`;
  const endTag = `</${surroundingTag}>`;

  sentence.begin = str.substring(0, str.indexOf(beginTag));
  sentence.emphasis = str.substring(str.indexOf(beginTag) + 3, str.indexOf(endTag));
  sentence.end = str.substring(str.indexOf(endTag) + 4);
  return sentence;
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

export const checkSessionProgress = (progress) => (
  progress.find((el) => el.isGuessed === true)
);

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

export const playAudios = (audios) => {
  const audio = new Audio();
  if (!Array.isArray(audios)) {
    audio.src = resourceUrl(audios);
    audio.play();
  } else {
    let index = 0;
    audio.src = resourceUrl(audios[index]);
    audio.play();

    audio.onended = () => {
      if (index < audios.length) {
        setTimeout(() => {
          index += 1;
          audio.src = resourceUrl(audios[index]);
          audio.play();
        }, 300);
      }
    };
  }
};
