import { baseUrl } from './settings';
import {
  successColor,
  fewErrorsColor,
  manyErrorsColor,
} from './style-options';

// export const ImageUrl = (image) => (`${baseUrl}${image}`);
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
  let result = [];
  if (!localStorage.rslang) {
    localStorage.setItem('rslang', JSON.stringify({}));
  } else {
    const rslang = JSON.parse(localStorage.getItem('rslang'));
    result = rslang?.learnSessionProgress;
  }
  return result || [];
};

export const setSessionProgress = (progress) => {
  if (!localStorage.rslang) {
    localStorage.setItem('rslang', JSON.stringify({}));
  }
  const rslang = JSON.parse(localStorage.getItem('rslang'));
  localStorage.setItem('rslang', JSON.stringify({ ...rslang, learnSessionProgress: progress }));
};

export const checkSessionProgress = (progress) => (
  progress.find((el) => el.isGuessed === true)
);

export const clearSessionProgress = () => {
  const rslang = JSON.parse(localStorage.getItem('rslang'));
  rslang.learnSessionProgress = [];
  localStorage.setItem('rslang', rslang);
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

export const encreaseRate = (wordObject, funcToConvertDate) => {
  const { rate } = wordObject;
  const updated = { ...wordObject };
  switch (rate) {
    case 0:
      updated.rate = 1;
      updated.next = funcToConvertDate(1);
      break;
    case 1:
      updated.rate = 2;
      updated.next = funcToConvertDate(2);
      break;
    case 2:
      updated.rate = 4;
      updated.next = funcToConvertDate(4);
      break;
    case 4:
      updated.rate = 7;
      updated.next = funcToConvertDate(7);
      break;
    case 7:
      updated.rate = 30;
      updated.next = funcToConvertDate(30);
      break;
    case 30:
      updated.rate = 60;
      updated.next = funcToConvertDate(60);
      break;
    case 60:
      updated.rate = 100;
      updated.next = funcToConvertDate(100);
      break;
    default:
      updated.rate = 101;
      updated.next = '';
      break;
  }
  return updated;
};
