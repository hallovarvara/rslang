export const isShownComplicatedButton = true;
export const isShownAnswerButton = true;
export const isShownImageAssociation = true;
export const isShownTranslation = true;
export const isShownTranscription = true;
export const isShownExampleSentence = true;
export const isShownMeaning = true;

export const categoriesSelect = [
  'all', 'only new', 'for repeating', 'complicated',
];

export const baseUrl = 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/';

export const initialProgressObject = {
  isGuessed: false,
  isShownWord: false,
  isWordSemiOpacity: false,
  isUsedTip: false,
  difference: null,
  isDifficultChosen: false,
  isRemoved: false,
  isComplicated: false,
  mistaken: false,
  secondRepeat: false,
  thirdRepeat: false,
};
