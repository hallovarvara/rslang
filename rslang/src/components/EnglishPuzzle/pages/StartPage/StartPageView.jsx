import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  // token,
}) => {
  // console.log(token, 1111)
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
      <p className="start-page__description">{description}</p>
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
// function mapStateToProps(state) {
//   return {
//     token: state.auth.token,
//     userId: state.auth.userId,
//   };
// }

StartPageView.propTypes = {
  handleClickButtonStart: PropTypes.func,
  getLevel: PropTypes.func,
  numberLevel: PropTypes.number,
  numberPage: PropTypes.number,
  getPage: PropTypes.func,

  // token: PropTypes.string,
  // userId: PropTypes.string,
};

// export default connect(mapStateToProps)(StartPageView);
export default StartPageView;

