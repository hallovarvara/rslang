const learnCardPreviewSettingsChanged = (changedSetting, value) => (
  {
    type: 'LEARN_CARD_PREVIEW_SETTINGS_CHANGED',
    payload: changedSetting,
    value,
  }
);

export {
  learnCardPreviewSettingsChanged,
};
