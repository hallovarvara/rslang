import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '@material-ui/core';

import {
  text,
  count,
  formLabel,
  gamesData,
} from '../../../../helpers/constants';

import Stepper from '../../../../basicComponents/Stepper';

import { generateStepperMarks } from '../../../../helpers/functions';

const StartGamePageView = ({
  getCountAnswers,
  getCountQuestions,
  countAnswers,
  countQuestions,
  handleSubmitForm,
  numberLevel,
  numberPage,
  getLevel,
  getPage,
}) => {
  const {
    ru: {
      chooseLevel,
      choosePage,
      button: { startGame },
      audioCall: { instruction },
    },
  } = text;
  const {
    groups,
    pages,
    maxCountQuestions,
    maxCountAnswers,
    minCountQuestions,
    minCountAnswers,
  } = count;
  const { audiocall: { title } } = gamesData;
  const { questions, answers } = formLabel;
  const buttonStyle = classNames('button', 'button_big');
  return (
    <div className="start-page">
      <h1 className="start-page__title">{title}</h1>
      <p className="start-page__description">{instruction}</p>
        <form className="start__form" onSubmit={() => handleSubmitForm()}>
      <div className="audioCall-steppers-container">
        <Stepper
          defaultValue={numberLevel + 1}
          onChangeCommitted={(event, value, ...args) => getLevel(value - 1, ...args)}
          step={null}
          max={groups}
          marks={generateStepperMarks(groups)}
          className="audioCall-levels-stepper"
          label={chooseLevel}
          arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
          stickyLabel={false}
        />
        <Stepper
          defaultValue={numberPage + 1}
          onChangeCommitted={(event, value, ...args) => getPage(value - 1, ...args)}
          step={null}
          max={pages}
          marks={generateStepperMarks(pages)}
          className="audioCall-pages-stepper"
          label={choosePage}
          arrayOfColorsForTrack={(new Array(pages)).fill('#84D7C3')}
          stickyLabel={true}
        />
        <Stepper
          defaultValue={countQuestions}
          onChangeCommitted={(event, value, ...args) => getCountQuestions(value, ...args)}
          step={null}
          min={minCountQuestions}
          max={maxCountQuestions}
          marks={generateStepperMarks(maxCountQuestions)}
          className="audioCall-question-stepper"
          label={questions}
          arrayOfColorsForTrack={(new Array(maxCountQuestions)).fill('#84D7C3')}
          stickyLabel={true}
        />
        <Stepper
          defaultValue={countAnswers}
          onChangeCommitted={(event, value, ...args) => getCountAnswers(value, ...args)}
          step={null}
          min={minCountAnswers}
          max={maxCountAnswers}
          marks={generateStepperMarks(maxCountAnswers)}
          className="audioCall-answers-stepper"
          label={answers}
          arrayOfColorsForTrack={(new Array(maxCountAnswers)).fill('#84D7C3')}
          stickyLabel={true}
        />
      </div>
        <Button
          className={buttonStyle}
          type="submit"
          variant="contained"
        >
         {startGame}
        </Button>
      </form>
    </div>
  );
};

StartGamePageView.propTypes = {
  handleChooseLevel: PropTypes.func,
  level: PropTypes.number,
  setNumberLevel: PropTypes.func,
  setcountAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getLevel: PropTypes.func,
  getPage: PropTypes.func,
  getCountAnswers: PropTypes.func,
  getCountQuestions: PropTypes.func,
  countAnswers: PropTypes.number,
  countQuestions: PropTypes.number,
};

export default StartGamePageView;
