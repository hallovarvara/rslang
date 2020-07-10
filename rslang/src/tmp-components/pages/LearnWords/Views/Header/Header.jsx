import React from 'react';
import PropTypes from 'prop-types';
import { buttonsNames } from '../../helpers/constants';

const { AUTO_VOICE } = buttonsNames;

const Header = ({ categoriesSelect, onToggleAutoPlay, onToggleCategory }) => (
  <div>
    <div>
      <h1>Learn words</h1>
      {/* //TODO: Here will be helper: Add right English word to sentence */}
    </div>
    {/* //TODO: Here will be two UI components */}
    {/* //TODO: Button: Auto paly on */}
    {/* //TODO: Drop-dawn: `Learn` category */}
    <button onClick={() => onToggleAutoPlay()}>{AUTO_VOICE}</button>
    <select onChange={(event) => onToggleCategory(event)}>
      {categoriesSelect.map((el, i) => (
        <option key={`category-${i}`} value={el}>
          {el}
        </option>
      ))}
    </select>
  </div>
);

Header.propTypes = {
  categoriesSelect: PropTypes.array,
  onToggleAutoPlay: PropTypes.func,
  onToggleCategory: PropTypes.func,
};

Header.defaultProps = {
  categoriesSelect: [],
  onToggleAutoPlay: () => {},
  onToggleCategory: () => {},
};

export default Header;

