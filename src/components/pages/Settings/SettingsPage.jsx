import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slider from '../../../basicComponents/Slider';
import LearnWordCardPreview from '../../LearnWordCardPreview';
import Checkbox from '../../../basicComponents/Checkbox';
import LiquidButton from '../../../basicComponents/LiquidButton';
import Notification from '../../../basicComponents/Notification';

import {
  learnCardPreviewSettingsChanged,
  wordsPerDayChanged,
} from '../../../redux/actions';

import { pagesData, localStorageItems, text } from '../../../helpers/constants';
import UserService from '../../../helpers/userService';

const userService = new UserService();

class SettingsPage extends React.Component {
  state = {
    notifications: [],
  }

  componentDidMount() {
    this.userId = localStorage.getItem(localStorageItems.userId);
  }

  updateNewWordsSettings = (newSetting) => {
    this.props.wordsPerDayChanged(newSetting);
  }

  render() {
    const {
      translation,
      complicatedButton,
      imageAssociatation,
      meaning,
      transcription,
      showAnswerButton,
      exampleSentence,
      exampleSentenceTranslation,
    } = this.props.previewSettings;
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
            <Slider
              onInputChange={this.updateNewWordsSettings}
              onSliderChange={this.updateNewWordsSettings}
              value={this.props.wordsPerDay}/>
          </div>
        </div>
        <div className="learn-card-preview">
          <h4 className="learn-card-preview__title">Что показывать на карточке слова</h4>
          <div className="preview-settings">
            <label className="preview-settings__setting translation">
              <Checkbox previewSettingName="translation" checked={translation}/>Перевод слова
            </label>
            <label className="preview-settings__setting complicated-button">
              <Checkbox previewSettingName="complicatedButton" checked={complicatedButton}/>Кнопка «Сложные»
            </label>
            <label className="preview-settings__setting image-associatation">
              <Checkbox previewSettingName="imageAssociatation" checked={imageAssociatation}/>Картинка для ассоциации
            </label>
            <label className="preview-settings__setting meaning">
              <Checkbox previewSettingName="meaning" checked={meaning}/>Значение
            </label>
            <label className="preview-settings__setting transcription">
              <Checkbox previewSettingName="transcription" checked={transcription}/>Транскрипция
            </label>
            <label className="preview-settings__setting show-answer-button">
              <Checkbox previewSettingName="showAnswerButton" checked={showAnswerButton}/>Кнопка «Показать ответ»
            </label>
            <label className="preview-settings__setting example-sentence">
              <Checkbox previewSettingName="exampleSentence" checked={exampleSentence}/>Пример предложения
            </label>
            <label className="preview-settings__setting example-sentence">
              <Checkbox previewSettingName="exampleSentenceTranslation" checked={exampleSentenceTranslation} /> Перевод примера предложения
            </label>
          </div>
          <LearnWordCardPreview />
        </div>
        <LiquidButton
            onClick={() => {
              try {
                userService.createUserSettings({
                  wordsPerDay: this.props.wordsPerDay,
                  optional: {
                    userId: this.userId,
                    option: {
                      ...this.props.previewSettings,
                    },
                  },
                });
                this.setState({
                  notifications: [{
                    type: 'success',
                    message: text.ru.settingsChangedSuccssfuly,
                  }],
                });
              } catch (error) {
                this.setState({
                  notifications: [
                    {
                      type: 'error',
                      message: text.ru.cantSaveSettings,
                    },
                  ],
                });
              }
            }}
            className="settings-page__save-button"
            text={text.ru.button.save}/>
          {
            this.state.notifications.map((notification, index) => (
              <Notification
                afterClose={() => this.setState({
                  notifications: [],
                })}
                key={index}
                variant={notification.type}
                message={notification.message}/>
            ))
          }
      </section>
    );
  }
}

SettingsPage.propTypes = {
  previewSettings: PropTypes.object,
  userId: PropTypes.string,
  settingChanged: PropTypes.func,
};

const mapStateToProps = (store) => (
  {
    userId: store.auth.userId,
    previewSettings: store.learnCardPreview.learnCardPreviewSettings,
    wordsPerDay: store.learnCardPreview.wordsPerDay,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    settingChanged: (previewSettingName, value) => {
      dispatch(
        learnCardPreviewSettingsChanged(previewSettingName, value),
      );
    },
    wordsPerDayChanged: (newWordsPerDay) => {
      dispatch(
        wordsPerDayChanged(newWordsPerDay),
      )
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
