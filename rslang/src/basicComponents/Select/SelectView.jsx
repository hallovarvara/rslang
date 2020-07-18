import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

const mapSelectTitlesToItems = (title, index) => (
  <MenuItem key={index} value={title} classes={{ root: 'menu-item' }}>{title}</MenuItem>
);

const selectClasses = {
  root: 'select-input',
  icon: 'select-arrow',
};

const SelectView = ({
  selectTitles = ['first', 'second', 'third'],
  className = '',
  defaultValue = selectTitles[0],
  menuPosition = { vertical: 'bottom', horizontal: 'center' },
  menuTransormOrigin = { vertical: 'top', horizontal: 'center' },
  disableScrollLock = true,
  onChange = () => { },
  value = null,
}) => (
    <Select
      className={`select-list ${className}`}
      classes={selectClasses}
      defaultValue={defaultValue}
      onChange={onChange}
      {...(value ? { value } : {})}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: menuPosition,
        transformOrigin: menuTransormOrigin,
        disableScrollLock,
        PopoverClasses: {
          root: 'select-popover-root',
        },
      }}
    >
      {
        selectTitles.map(mapSelectTitlesToItems)
      }
    </Select>
  );

SelectView.propTypes = {
  className: PropTypes.string,
  selectTitles: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
  menuPosition: PropTypes.object,
  menuTransormOrigin: PropTypes.object,
  disableScrollLock: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SelectView;
