const initialState = {
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
      console.log(action);
      if (action.value !== undefined) {
        newSetting = action.value;
      } else {
        newSetting = !currentSetting;
      }
      console.log(newSetting);
      newState.learnCardPreviewSettings[changedSetting] = newSetting;
      return newState;
    default:
      return state;
  }
};

export default reducer;
