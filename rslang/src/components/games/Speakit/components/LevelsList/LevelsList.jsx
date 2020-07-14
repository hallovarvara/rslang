import React from 'react';
import PropTypes from 'prop-types';

import LevelItem from '../LevelItem';
import { levelsCount } from '../../helpers/constants';

const mapLevelsArrToItems = (index, currentLevel, levelChanged) => {
  const isSelected = index === currentLevel;

  return (
    <LevelItem
      onClick={() => levelChanged(index)}
      isSelected={isSelected}
      key={index}/>
  );
};

const LevelsList = ({ currentLevel, levelChanged }) => {
  const levelsArr = (new Array(levelsCount)).fill('level');

  return (
    <ul className="levels-container">
      {
        levelsArr
          .map((item, index) => mapLevelsArrToItems(index, currentLevel, levelChanged))
      }
    </ul>
  );
};

LevelsList.propTypes = {
  currentLevel: PropTypes.number,
  levelChanged: PropTypes.func,
};

export default LevelsList;
