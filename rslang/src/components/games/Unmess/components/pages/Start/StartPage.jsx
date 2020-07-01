import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StartButton from '../../StartButton';
import Preloader from '../../Preloader';
import Stepper from '../../../../../../basicComponents/Stepper';

import { levelsCount } from '../../../helpers/contants';

const StartPage = (props) => {
  const {
    loading,
  } = props;

  const stepperMarks = (new Array(levelsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }));

  return (
    <div className="start-page">
      <h2 className="start-page__title">Unmess</h2>
      <p className="start-page__description">Соедините правильно слова и их значения</p>
      {
        loading
          ? <Preloader />
          : (<React.Fragment>
              <Stepper
                step={null}
                max={levelsCount}
                marks={stepperMarks}
                className="unmess-level-stepper"
                label="Выберите уровень:"
                arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
                />
              <Link to="/unmess/game"><StartButton /></Link>
            </React.Fragment>)
      }
    </div>
  );
};

StartPage.propTypes = {
  loading: PropTypes.bool,
};

export default StartPage;
