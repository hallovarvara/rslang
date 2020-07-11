import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

const mapSelectTitlesToItems = (title, index) => (
    <MenuItem key={index} value={title} classes={{ root: 'menu-item' }}>{title}</MenuItem>
);

const SelectView = ({ selectTitles = ['first', 'second', 'third'], className = '' }) => (
  <Select className={className} classes={{ root: 'select-input', icon: 'select-arrow' }} defaultValue={selectTitles[0]}>
    {
      selectTitles.map(mapSelectTitlesToItems)
    }
  </Select>
);

SelectView.propTypes = {
  className: PropTypes.string,
  selectTitles: PropTypes.arrayOf(PropTypes.string),
};

export default SelectView;
