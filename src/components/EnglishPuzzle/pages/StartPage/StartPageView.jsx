import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { gamesData, text } from '../../../../helpers/constants';
import { levelsCount, pagesCount } from '../../constants';
import { generateStepperMarks } from '../../../../helpers/functions';
import Stepper from '../../../../basicComponents/Stepper';

const StartPageView = ({
  handleClickButtonStart,
  getLevel,
  numberLevel,
  numberPage,
  getPage,
}) => {
  const { englishPuzzle: { title, description } } = gamesData;
  const { ru: { button: { startGame }, chooseLevel, choosePage } } = text;
  const buttonStyle = classNames('button', 'button_big');
  const stepperMarks = (new Array(levelsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }));
  return (
    <div className="start-page">
      <h2 className="start-page__title">{title}</h2>
      <p className="start-page__description">{Parser(description)}</p>
      <div className="puzzle-steppers-container">
        <Stepper
          defaultValue={numberLevel + 1}
          onChangeCommitted={(event, value, ...args) => getLevel(value - 1, ...args)}
          step={null}
          max={levelsCount}
          marks={stepperMarks}
          className="puzzle-levels-stepper"
          label={chooseLevel}
          arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
          stickyLabel={false}
        />
        <Stepper
          defaultValue={numberPage + 1}
          onChangeCommitted={(event, value, ...args) => getPage(value - 1, ...args)}
          step={null}
          max={pagesCount}
          marks={generateStepperMarks(pagesCount)}
          className="puzzle-pages-stepper"
          label={choosePage}
          arrayOfColorsForTrack={(new Array(pagesCount)).fill('#84D7C3')}
          stickyLabel={true}
        />
      </div>
      <Button
        className={buttonStyle}
        variant="contained"
        onClick={() => handleClickButtonStart()}
      >
        {startGame}
      </Button>
    </div>
  );
};

StartPageView.propTypes = {
  handleClickButtonStart: PropTypes.func,
  getLevel: PropTypes.func,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getPage: PropTypes.func,
};

export default StartPageView;
