import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slider from '../../../basicComponents/Slider';
import LearnWordCardPreview from '../../LearnWordCardPreview';
import Checkbox from '../../../basicComponents/Checkbox';

const SettingPage = (props) => {
  const {
    translation: translationVisibility,
    complicatedButton: complicatedButtonVisibility,
    imageAssociatation: imageAssociatationVisibility,
    meaning: meaningVisibility,
    transcription: transcriptionVisibility,
    showAnswerButton: showAnswerButtonVisibility,
    exampleSentence: exampleSentenceVisibility,
  } = props.previewSettings;
  return (
    <section className="settings-page">
      <h2 className="settings_page__title">Settings</h2>
      <div className="words-settings">
        <h4 className="words-settings__title"><span>Learning</span>: Words</h4>
        <div className="max-words-per-day-settings">
          <p className="max-words-per-day-settings__title">Maximum words per day</p>
          <Slider />
        </div>
        <div className="new-words-per-day-settings">
          <p className="new-words-per-day-settings__title">New words per day</p>
          <Slider />
        </div>
      </div>
      <div className="learn-card-preview">
        <h4 className="learn-card-preview__title"><span>Learning</span>: What to show on word’s card</h4>
        <div className="preview-settings">
          <label className="preview-settings__setting translation">
            <Checkbox previewSettingName="translation" checked={translationVisibility}/>Translation
          </label>
          <label className="preview-settings__setting complicated-button">
            <Checkbox previewSettingName="complicatedButton" checked={complicatedButtonVisibility}/>„Complicated” button
          </label>
          <label className="preview-settings__setting image-associatation">
            <Checkbox previewSettingName="imageAssociatation" checked={imageAssociatationVisibility}/>Image association
          </label>
          <label className="preview-settings__setting meaning">
            <Checkbox previewSettingName="meaning" checked={meaningVisibility}/>Meaning
          </label>
          <label className="preview-settings__setting example-sentence">
            <Checkbox previewSettingName="transcription" checked={transcriptionVisibility}/>Transcription
          </label>
          <label className="preview-settings__setting transcription">
            <Checkbox previewSettingName="showAnswerButton" checked={showAnswerButtonVisibility}/>„Show answer” button
          </label>
          <label className="preview-settings__setting show-answer-button">
            <Checkbox previewSettingName="exampleSentence" checked={exampleSentenceVisibility}/>Example sentence
          </label>
        </div>
        <LearnWordCardPreview />
      </div>
    </section>
  );
};

SettingPage.propTypes = {
  previewSettings: PropTypes.object,
};

const mapStateToProps = ({ learnCardPreviewSettings }) => (
  {
    previewSettings: learnCardPreviewSettings,
  }
);

export default connect(mapStateToProps)(SettingPage);
