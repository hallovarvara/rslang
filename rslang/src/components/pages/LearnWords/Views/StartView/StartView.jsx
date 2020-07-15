import React from 'react';
import PropTypes from 'prop-types';
import { buttonsNames, labels } from '../../helpers/constants';
import {pagesData} from "../../../../../helpers/constants";

const StartView = ({ onContinueLearning, onStartNewLearning, isContinued }) => (
  <div className="lw-startview__wrapper learn-words">
    <h1>{ pagesData.learnWords.title }</h1>
    <div className="lw-startview__button-group">
      {isContinued && (
        <h3 className="lw-startview-title">{labels.startLabel}</h3>
      )}
      {isContinued && (
        <button onClick={() => onContinueLearning()}>
          {buttonsNames.CONTINUE}
        </button>
      )}
      <button onClick={() => onStartNewLearning()}>
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
