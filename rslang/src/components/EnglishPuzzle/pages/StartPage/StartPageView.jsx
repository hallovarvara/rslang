import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { gamesData, text } from '../../../../helpers/constants';
import { levelsCount } from '../../constants';
import Stepper from '../../../../basicComponents/Stepper';

const StartPageView = ({ handleClickButtonStart, getLevel, numberLevel }) => {
  const { englishPuzzle: { title, description } } = gamesData;
  const { ru: { button: { startGame }, chooseLevel } } = text;
  const buttonStyle = classNames('button', 'button_big');
  const stepperMarks = (new Array(levelsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }));
  return (
    <div className="start-page">
      <h2 className="start-page__title">{title}</h2>
      <p className="start-page__description">{description}</p>
      <Stepper
        defaultValue={numberLevel + 1}
        onChangeCommitted={(event, value) => getLevel(value - 1)}
        step={null}
        max={levelsCount}
        marks={stepperMarks}
        className="puzzle-levels-stepper"
        label={chooseLevel}
        arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
      />
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
};

export default StartPageView;
