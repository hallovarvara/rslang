import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const mapSelectTitlesToItems = (title, index) => (
    <MenuItem key={index} value={title} className="select-list__item">{title}</MenuItem>
);

const SelectView = ({ selectTitles = ['first', 'second', 'third'], className = '' }) => {
  const StyledSelect = withStyles({
    root: {
      fontWeight: '600',
      fontSize: '2.5rem',
      fontFamily: '"Inter", sans-serif',
      fontStyle: 'normal',
      lineHeight: '100%',
    },
  })(Select);

  const classes = classNames({
    'select-list': true,
    [className]: true,
  });
  // TODO: get defaultValue from redux
  return (
    <StyledSelect className={classes} defaultValue={selectTitles[0]}>
      {
        selectTitles.map(mapSelectTitlesToItems)
      }
    </StyledSelect>
  );
};

SelectView.propTypes = {
  selectTitles: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default SelectView;
