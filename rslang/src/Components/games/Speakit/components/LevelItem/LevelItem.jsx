import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LevelItem = ({ isSelected, onClick }) => {
  const classes = classNames({
    'levels-container__level': true,
    'levels-container__level_selected': isSelected,
  });
  return <li onClick={onClick} className={classes}></li>;
};

LevelItem.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LevelItem;
