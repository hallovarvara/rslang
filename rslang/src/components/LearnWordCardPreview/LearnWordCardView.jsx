import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import LinearProgress from '../../basicComponents/LinearProgress';

const LearnWordCardView = ({ previewSettings }) => {
  const {
    translation: translationVisibility,
    complicatedButton: complicatedButtonVisibility,
    imageAssociatation: imageAssociatationVisibility,
    meaning: meaningVisibility,
    transcription: transcriptionVisibility,
    showAnswerButton: showAnswerButtonVisibility,
    exampleSentence: exampleSentenceVisibility,
  } = previewSettings;

  const translationItemClasses = classNames({
    'learn-word-card-info__sentence-translation': true,
    hidden: !translationVisibility,
  });
  const complicatedButtonItemClasses = classNames({
    'learn-word-status-settings__complicated': true,
    hidden: !complicatedButtonVisibility,
  });
  const imageAssociatationItemClasses = classNames({
    'learn-word-card-control': true,
    'without-bg': !imageAssociatationVisibility,
  });
  const meaningItemClasses = classNames({
    'learn-word-card-info__explanation': true,
    hidden: !meaningVisibility,
  });
  const transcriptionItemClasses = classNames({
    'target-learn-word-container__transcription': true,
    hidden: !transcriptionVisibility,
  });
  const showAnswerButtonItemClasses = classNames({
    'learn-word-card-control__show-answer-button': true,
    hidden: !showAnswerButtonVisibility,
  });
  const exampleSentenceItemClasses = classNames({
    'learn-word-card-info__example-sentence': true,
    hidden: !exampleSentenceVisibility,
  });

  return (
    <div className="learn-word-card-wrapper">
      <LinearProgress />
      <div className="learn-word-card">
        <div className="learn-word-card-info">
          <div className="learn-word-card-general-info">
            <p className="learn-word-card-general-info__all-done">15/60</p>
            <div className="learn-word-status-settings">
              <div className={complicatedButtonItemClasses}><span></span>Complicated</div>
              <div className="learn-word-status-settings__remove"><span></span>Remove</div>
            </div>
          </div>
          <p className="learn-word-card-sentence">
            I <span className="learn-word-card-sentence__target-word">run</span> every morning
          </p>
          <p className={translationItemClasses}>Я бегаю каждое утро</p>
          <div className="line learn-word-card-info__line"></div>
          <div className="target-learn-word-container">
            <p className="target-learn-word-container__target-word">run</p>
            <p className={transcriptionItemClasses}>/rən/</p>
          </div>
          <p className={meaningItemClasses}>Move at a speed faster than a walk</p>
          <p className={exampleSentenceItemClasses}>It would have been easier to run off</p>
        </div>
        <div className={imageAssociatationItemClasses}>
          <div className={showAnswerButtonItemClasses}>Show answer</div>
          <div className="flip-buttons-container">
            <div className="flip-buttons-container__prev-button">← prev</div>
            <div className="flip-buttons-container__next-button">next →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

LearnWordCardView.propTypes = {
  previewSettings: PropTypes.object,
};

const mapStateToProps = (store) => (
  {
    previewSettings: store.learnCardPreview.learnCardPreviewSettings,
  }
);

export default connect(mapStateToProps)(LearnWordCardView);
