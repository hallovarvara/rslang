import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { buttonsNames, labels } from '../../helpers/constants';
import { pagesData } from '../../../../../helpers/constants';

const StartView = ({ onContinueLearning, onStartNewLearning, isContinued }) => (
  <div className="lw-startview__wrapper learn-words">
    <h1 className="lw-startview__wrapper__title">{ pagesData.learnWords.title }</h1>
    <div className="lw-icons-container">
      <span className="lw-icons-container__icon pencil"></span>
      <span className="lw-icons-container__icon book"></span>
      <span className="lw-icons-container__icon hat"></span>
    </div>
    <p className="lw-startview__wrapper__description">{ Parser(pagesData.learnWords.description) }</p>
    {isContinued && (
        <h3 className="lw-startview-title">{labels.startLabel}</h3>
    )}
    <div className="lw-startview__button-group">
      {isContinued && (
        <button className="lw-startview__button-group__button continue" onClick={() => onContinueLearning()}>
          {buttonsNames.CONTINUE}
        </button>
      )}
      <button className="lw-startview__button-group__button start" onClick={() => onStartNewLearning()}>
        {buttonsNames.NEW_LESSON}
      </button>
    </div>
  </div>
);

StartView.propTypes = {
  onContinueLearning: PropTypes.func,
  onStartNewLearning: PropTypes.func,
  isContinued: PropTypes.bool,
};

export default StartView;
