import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ categoriesSelect }) => (
  <div>
    <div>
      <h1>Learn words</h1>
      {/* //TODO: Here will be helper: Add right English word to sentence */}
    </div>
    {/* //TODO: Here will be two UI components */}
    {/* //TODO: Button: Auto paly on */}
    {/* //TODO: Drop-dawn: `Learn` category */}
    <div>{categoriesSelect}</div>
  </div>
);

Header.propTypes = {
  categoriesSelect: PropTypes.array,
};

export default Header;
