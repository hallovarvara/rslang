const learnCardPreviewSettingsChanged = (changedSetting) => (
  {
    type: 'LEARN_CARD_PREVIEW_SETTINGS_CHANGED',
    payload: changedSetting,
  }
);

export {
  learnCardPreviewSettingsChanged,
};
