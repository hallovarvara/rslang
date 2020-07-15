import React from 'react';
import PropTypes from 'prop-types';

import Preloader from '../../Preloader';
import StartButton from '../../StartButton';
import Stepper from '../../../../../../basicComponents/Stepper';

import { text } from '../../../../../../helpers/constants';

import {
  levelsCount,
  pagesCount,
} from '../../../helpers/constants';

import { generateStepperMarks } from '../../../../../../helpers/functions';

class HomePage extends React.Component {
  render() {
    const {
      loading,
      currentLevel,
      currentPage,
      levelChanged,
      pageChanged,
    } = this.props;

    return (
      <div className="home-page-container">
        <h1 className="home-page-container__title">SPEAKIT</h1>
        <p className="home-page-container__description">{text.ru.speakit.instruction[0]}<br></br>{text.ru.speakit.instruction[1]}</p>
        {loading ? <Preloader />
          : <>
            <div className="speakit-steppers-container">
              <Stepper
                  defaultValue={currentLevel + 1}
                  onChangeCommitted={(event, value, ...args) => levelChanged(value - 1, ...args)}
                  step={null}
                  max={levelsCount}
                  marks={generateStepperMarks(levelsCount)}
                  className="speakit-levels-stepper"
                  label={text.ru.chooseLevel}
                  arrayOfColorsForTrack={['#7CCBB3', '#90BE6D', '#F9C74F', '#F8961E', '#F3722C', '#F94144']}
                  stickyLabel={false}
                />
                <Stepper
                  defaultValue={currentPage + 1}
                  onChangeCommitted={(event, value, ...args) => pageChanged(value - 1, ...args)}
                  step={null}
                  max={pagesCount}
                  marks={generateStepperMarks(pagesCount)}
                  className="speakit-pages-stepper"
                  label={text.ru.choosePage}
                  arrayOfColorsForTrack={(new Array(pagesCount)).fill('#84D7C3')}
                  stickyLabel={true}
                />
            </div>
            <StartButton />
          </>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  currentLevel: PropTypes.number,
  currentPage: PropTypes.number,
  levelChanged: PropTypes.func,
  pageChanged: PropTypes.func,
};

export default HomePage;
