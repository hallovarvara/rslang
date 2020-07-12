import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { gamesData, text } from '../../../../helpers/constants';
import { levelsCount } from '../../constants';
import Stepper from '../../../../basicComponents/Stepper';
import style from './StartPageView.module.scss';

const StartPageView = ({ handleClickButtonStart }) => {
  const { englishPuzzle: { title, description } } = gamesData;
  const { ru: { button: { startGame } } } = text;
  const stepperMarks = (new Array(levelsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }));
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.text}>{description}</p>
      <Stepper
        defaultValue='1'
        // onChangeCommitted={(event, value) => levelChanged(value - 1)}
        step={null}
        max={levelsCount}
        marks={stepperMarks}
        // className={style['puzzle-levls-stepper'] }
        label="Выберите уровень:"
        arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
      />
      <Button
        className={style.button}
        variant="contained"
        onClick={handleClickButtonStart}
      >
        {startGame}
      </Button>
    </div>
  );
};

StartPageView.propTypes = {
  handleClickButtonStart: PropTypes.func,
};

export default StartPageView;
