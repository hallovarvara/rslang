import { baseUrl } from './settings';
import { RSLANG_SESSION_PROGRESS } from './constants';
import { successColor, fewErrorsColor, manyErrorsColor } from './style-options';

export const resourceUrl = (path) => `${baseUrl}${path}`;

export const extractEmphasizedWord = (str, surroundingTag) => {
  const sentence = {};
  const beginTag = `<${surroundingTag}>`;
  const endTag = `</${surroundingTag}>`;

  sentence.begin = str.substring(0, str.indexOf(beginTag));
  sentence.emphasis = str.substring(
    str.indexOf(beginTag) + 3,
    str.indexOf(endTag),
  );
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
  console.log(RSLANG_SESSION_PROGRESS, progress);
  localStorage.setItem(RSLANG_SESSION_PROGRESS, JSON.stringify(progress));
};

export const checkSessionProgress = (words) => words.find((el) => el.progress.isGuessed === true);

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
