const learnCardPreviewSettingsChanged = (changedSetting, value) => (
  {
    type: 'LEARN_CARD_PREVIEW_SETTINGS_CHANGED',
    payload: changedSetting,
    value,
  }
);

const overwriteSettings = (newSettings) => ({
  type: 'OVERWRITE_SETTINGS',
  payload: newSettings,
});

const wordsPerDayChanged = (newWordsPerDay) => ({
  type: 'WORDS_PER_DAY_CHANGED',
  payload: newWordsPerDay,
})

export {
  learnCardPreviewSettingsChanged,
  overwriteSettings,
  wordsPerDayChanged,
};
