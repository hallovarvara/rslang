import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  TextField,
  Button,
} from '@material-ui/core';

import {
  text,
  count,
  formLabel,
  gamesData,
} from '../../../../helpers/constants';

import Stepper from '../../../../basicComponents/Stepper';

import { generateStepperMarks } from '../../../../helpers/functions';

const StartGamePageView = ({
  setNumberLevel,
  setcountAnswers,
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
  const { groups, pages } = count;
  const { audiocall: { title } } = gamesData;
  const { questions, answers } = formLabel;
  const buttonStyle = classNames('button', 'button_big');
  const stepperMarks = (new Array(groups).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }));
  return (
    <div className="start-page">
      <h1 className="start-page__title">{title}</h1>
      <p className="start-page__description">{instruction}</p>
      <div className="audioCall-steppers-container">
        <Stepper
          defaultValue={numberLevel + 1}
          onChangeCommitted={(event, value, ...args) => getLevel(value - 1, ...args)}
          step={null}
          max={groups}
          marks={stepperMarks}
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
      </div>
      <form className="start__form" onSubmit={() => handleSubmitForm()}>
        <TextField
          required
          className="start-page__input"
          id="audiocall-start__questions"
          type="number"
          label={questions}
          defaultValue="5"
          inputProps={{ pattern: '[0-9]', min: '5', max: '12' }}
          variant="filled"
          onChange={setNumberLevel}
        />
        <TextField
          required
          className="start-page__input"
          id="audiocall-start__questions"
          type="number"
          label={answers}
          defaultValue="5"
          inputProps={{ pattern: '[2-5]', min: '2', max: '5' }}
          variant="filled"
          onChange={setcountAnswers}
        />
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
};

export default StartGamePageView;
