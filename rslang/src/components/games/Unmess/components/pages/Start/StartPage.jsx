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

  const stepperMarks = new Array(levelsCount).fill({});

  return (
    <div className="start-page">
      <h2 className="start-page__title">Unmess</h2>
      <p className="start-page__description">Соедините правильно слова и их значения</p>
      {
        loading
          ? <Preloader />
          : (<React.Fragment>
              <Stepper
                className="unmess-level-stepper"
                label="Выберите уровень:" />
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
