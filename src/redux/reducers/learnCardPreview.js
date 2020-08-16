const initialState = {
  wordsPerDay: 20,
  learnCardPreviewSettings: {
    translation: true,
    complicatedButton: true,
    imageAssociatation: true,
    meaning: true,
    transcription: true,
    showAnswerButton: true,
    exampleSentence: true,
    exampleSentenceTranslation: true,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LEARN_CARD_PREVIEW_SETTINGS_CHANGED':
      const changedSetting = action.payload;
      const newState = {
        ...state,
        learnCardPreviewSettings: {
          ...state.learnCardPreviewSettings,
        },
      };
      const currentSetting = newState.learnCardPreviewSettings[changedSetting];
      let newSetting;
      if (action.value !== undefined) {
        newSetting = action.value;
      } else {
        newSetting = !currentSetting;
      }
      newState.learnCardPreviewSettings[changedSetting] = newSetting;
      return newState;
    default:
      return state;
    case 'OVERWRITE_SETTINGS':
      return {
        ...state,
        wordsPerDay: action.payload.wordsPerDay,
        learnCardPreviewSettings: {
          ...action.payload.previewSettings,
        },
      }
    case 'WORDS_PER_DAY_CHANGED':
      return {
        ...state,
        wordsPerDay: action.payload,
      }
  }
};

export default reducer;
