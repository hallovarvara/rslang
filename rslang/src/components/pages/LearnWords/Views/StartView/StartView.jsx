import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { buttonsNames, labels } from '../../helpers/constants';
import { pagesData, text, count } from '../../../../../helpers/constants';
import { generateStepperMarks } from '../../../../../helpers/functions';

import Switch from '../../../../../basicComponents/Switch';
import Stepper from '../../../../../basicComponents/Stepper';

const StartView = ({
  onContinueLearning,
  onStartNewLearning,
  isContinued,
  setWordsRandomly,
  setUserLevel,
  setUserPage,
  isWordsRandomly,
  userPage,
  userLevel,
}) => (
  <div className="lw-startview__wrapper learn-words">
    <h1 className="lw-startview__wrapper__title">{ pagesData.learnWords.title }</h1>
    <div className="lw-icons-container">
      <span className="lw-icons-container__icon pencil"></span>
      <span className="lw-icons-container__icon book"></span>
      <span className="lw-icons-container__icon hat"></span>
    </div>
    <p className="lw-startview__wrapper__description">{
      Parser(pagesData.learnWords.description)
    }</p>
    <div className="lw-words-settings-container">
      <Switch
        defaultChecked={isWordsRandomly}
        onChange={(event) => setWordsRandomly(event.target.checked)}
        className="lw"/>
      <Stepper
        disabled={isWordsRandomly}
        defaultValue={userLevel + 1}
        onChangeCommitted={(event, value, ...args) => setUserLevel(value - 1, ...args)}
        step={null}
        max={count.groups}
        marks={generateStepperMarks(count.groups)}
        className="lw-levels-stepper"
        label={pagesData.learnWords.chooseLevel}
        arrayOfColorsForTrack={['#00e5a1', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
        stickyLabel={false}
      />
      <Stepper
        disabled={isWordsRandomly}
        defaultValue={userPage + 1}
        onChangeCommitted={(event, value, ...args) => setUserPage(value - 1, ...args)}
        step={null}
        max={count.pages + 1}
        marks={generateStepperMarks(count.pages + 1)}
        className="lw-pages-stepper"
        label={pagesData.learnWords.choosePage}
        arrayOfColorsForTrack={(new Array(count.pages + 1)).fill('#000000')}
        stickyLabel={true}
      />
    </div>
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
        {
          isContinued
            ? buttonsNames.NEW_LESSON
            : text.ru.button.learnWords
        }
      </button>
    </div>
  </div>
);

StartView.propTypes = {
  onContinueLearning: PropTypes.func,
  onStartNewLearning: PropTypes.func,
  isContinued: PropTypes.bool,
  setWordsRandomly: PropTypes.func,
  setUserLevel: PropTypes.func,
  setUserPage: PropTypes.func,
  isWordsRandomly: PropTypes.bool,
  userPage: PropTypes.number,
  userLevel: PropTypes.number,
};

export default StartView;
