import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StartButton from '../../StartButton';
import Preloader from '../../Preloader';
import Stepper from '../../../../../../basicComponents/Stepper';
import Select from '../../../../components/Select';

import {
  levelsCount,
  pagesCount,
} from '../../../helpers/contants';

import { generateStepperMarks } from '../../../../../../helpers/functions';

const StartPage = (props) => {
  const {
    loading,
    levelChanged,
    pageChanged,
    currentLevel,
    currentPage,
    useUserWords,
    isUserLogged,
    showNotifications,
    setUsingOfUserWords,
  } = props;

  return (
    <div className="start-page">
      <h2 className="start-page__title game-title">Unmess</h2>
      <p className="start-page__description">Соедините правильно слова и их значения</p>
      {
        loading
          ? <Preloader />
          : (<>
            <div className="unmess-settings-container">
              <Select
                setUsingOfUserWords={setUsingOfUserWords}
                showNotifications={showNotifications}
                useUserWords={useUserWords}
                isUserLogged={isUserLogged}/>
              <Stepper
                  defaultValue={currentLevel + 1}
                  onChangeCommitted={(event, value, ...args) => levelChanged(value - 1, ...args)}
                  step={null}
                  max={levelsCount}
                  marks={generateStepperMarks(levelsCount)}
                  className="unmess-levels-stepper"
                  label="Выберите уровень:"
                  arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
                  stickyLabel={false}
                />
                <Stepper
                  defaultValue={currentPage + 1}
                  onChangeCommitted={(event, value, ...args) => pageChanged(value - 1, ...args)}
                  step={null}
                  max={pagesCount}
                  marks={generateStepperMarks(pagesCount)}
                  className="unmess-pages-stepper"
                  label="Выберите страницу:"
                  arrayOfColorsForTrack={(new Array(pagesCount)).fill('#84D7C3')}
                  stickyLabel={true}
                />
            </div>
              <Link to="/unmess/game"><StartButton /></Link>
            </>)
      }
    </div>
  );
};

StartPage.propTypes = {
  loading: PropTypes.bool,
  levelChanged: PropTypes.func,
  pageChanged: PropTypes.func,
  currentLevel: PropTypes.number,
  currentPage: PropTypes.number,
  useUserWords: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  showNotifications: PropTypes.func,
  setUsingOfUserWords: PropTypes.func,
};

export default StartPage;
