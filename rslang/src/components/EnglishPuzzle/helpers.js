import * as constants from './constants';

export const shuffle = (array) => (array.sort(() => Math.random() - 0.5));

export const generateQuestionsArray = (data, amountLevels = 12) => (
  shuffle(data).slice(0, amountLevels)
);

export const replaceAudioSrc = (audio) => (
  constants.audioSrc
    .replace('{audioExample}', audio)
);

export const playAudio = (audio, isShow) => {
  if (isShow) {
    const audioElement = new Audio(replaceAudioSrc(audio));
    audioElement.play();
  }
};

export const getBackground = () => {
  
}
