const initialState = {
  learnCardPreviewSettings: {
    translation: true,
    complicatedButton: true,
    imageAssociatation: true,
    meaning: true,
    transcription: true,
    showAnswerButton: true,
    exampleSentence: true,
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
      newState.learnCardPreviewSettings[changedSetting] = !currentSetting;
      return newState;
    default:
      return state;
  }
};

export default reducer;
