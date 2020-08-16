import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { buttonsNames } from '../../helpers/constants';
import { pagesData } from '../../../../../helpers/constants';

import Select from '../../../../../basicComponents/Select';
import Popover from '../../../../../basicComponents/Popover';

const { AUTO_VOICE } = buttonsNames;

const Header = ({
  categoriesSelect,
  onToggleAutoPlay,
  onToggleCategory,
  isAutoPlay,
}) => (
  <div className="lw-header">
    <div className="lw-title-container">
      <h1 className="lw-title-container__title">
        {pagesData.learnWords.title}
      </h1>
      <Popover
        className="lw-title-container__question"
        descriptionClassName="lw-title-container__description"
        title={<span className="question-icon lw-question-icon"></span>}
        description={<span>{pagesData.learnWords.rules}</span>}
      />
    </div>
    <div className="lw-filter-container">
      <button
          className={classNames({
            'lw-filter-container__autoplay': true,
            active: isAutoPlay,
          })}
        onClick={() => onToggleAutoPlay()}
      >
        <span className="autoplay-icon"></span>
        {AUTO_VOICE}
      </button>
      <Select
        onChange={(event) => onToggleCategory(event)}
        className="lw-filter-container__select"
        selectTitles={categoriesSelect.map((selectObj) => selectObj.title)}
      />
    </div>
  </div>
);

Header.propTypes = {
  categoriesSelect: PropTypes.array,
  onToggleAutoPlay: PropTypes.func,
  onToggleCategory: PropTypes.func,
  isAutoPlay: PropTypes.bool,
};

Header.defaultProps = {
  categoriesSelect: [],
  onToggleAutoPlay: () => {},
  onToggleCategory: () => {},
  isAutoPlay: true,
};

export default Header;
