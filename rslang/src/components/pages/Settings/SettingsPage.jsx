import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slider from '../../../basicComponents/Slider';
import LearnWordCardPreview from '../../LearnWordCardPreview';
import Checkbox from '../../../basicComponents/Checkbox';

import { pagesData } from '../../../helpers/constants';

const SettingsPage = (props) => {
  const {
    translation: translationVisibility,
    complicatedButton: complicatedButtonVisibility,
    imageAssociatation: imageAssociatationVisibility,
    meaning: meaningVisibility,
    transcription: transcriptionVisibility,
    showAnswerButton: showAnswerButtonVisibility,
    exampleSentence: exampleSentenceVisibility,
    exampleSentenceTranslation: exampleSentenceTranslationVisibility,
  } = props.previewSettings;
  return (
    <section className="settings-page">
      <h2 className="settings_page__title">{pagesData.settings.title}</h2>
      <div className="words-settings">
        <h4 className="words-settings__title">Сколько слов учить в день</h4>
        <div className="max-words-per-day-settings">
          <p className="max-words-per-day-settings__title">Всего</p>
          <Slider />
        </div>
        <div className="new-words-per-day-settings">
          <p className="new-words-per-day-settings__title">Новых</p>
          <Slider />
        </div>
      </div>
      <div className="learn-card-preview">
        <h4 className="learn-card-preview__title">Что показывать на карточке слова</h4>
        <div className="preview-settings">
          <label className="preview-settings__setting translation">
            <Checkbox previewSettingName="translation" checked={translationVisibility}/>Перевод слова
          </label>
          <label className="preview-settings__setting complicated-button">
            <Checkbox previewSettingName="complicatedButton" checked={complicatedButtonVisibility}/>Кнопка «Сложные»
          </label>
          <label className="preview-settings__setting image-associatation">
            <Checkbox previewSettingName="imageAssociatation" checked={imageAssociatationVisibility}/>Картинка для ассоциации
          </label>
          <label className="preview-settings__setting meaning">
            <Checkbox previewSettingName="meaning" checked={meaningVisibility}/>Значение
          </label>
          <label className="preview-settings__setting transcription">
            <Checkbox previewSettingName="transcription" checked={transcriptionVisibility}/>Транскрипция
          </label>
          <label className="preview-settings__setting show-answer-button">
            <Checkbox previewSettingName="showAnswerButton" checked={showAnswerButtonVisibility}/>Кнопка «Показать ответ»
          </label>
          <label className="preview-settings__setting example-sentence">
            <Checkbox previewSettingName="exampleSentence" checked={exampleSentenceVisibility}/>Пример предложения
          </label>
          <label className="preview-settings__setting example-sentence">
            <Checkbox previewSettingName="exampleSentenceTranslation" checked={exampleSentenceTranslationVisibility} /> Перевод примера предложения
          </label>
        </div>
        <LearnWordCardPreview />
      </div>
    </section>
  );
};

SettingsPage.propTypes = {
  previewSettings: PropTypes.object,
};

const mapStateToProps = (store) => (
  {
    previewSettings: store.learnCardPreview.learnCardPreviewSettings,
  }
);

export default connect(mapStateToProps)(SettingsPage);
