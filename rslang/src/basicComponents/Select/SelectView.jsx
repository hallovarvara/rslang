import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function mapSelectTitlesToItems(title, index) {
  return (
    <MenuItem key={index} value={title} className="select-list__item">{title}</MenuItem>
  );
}

const SelectView = (props) => {
  const { selectTitles = ['first', 'second', 'third'] } = props;

  const StyledSelect = withStyles({
    root: {
      fontWeight: '600',
      fontSize: '2.5rem',
      fontFamily: '"Inter", sans-serif',
      fontStyle: 'normal',
      lineHeight: '100%',
    },
  })(Select);
  // defaultValue should be got from the
  // redux in the future (now it's the first element from the selectListTitles)
  return (
    <StyledSelect className='select-list' defaultValue={selectTitles[0]}>
      {
        selectTitles.map(mapSelectTitlesToItems)
      }
    </StyledSelect>
  );
};

SelectView.propTypes = {
  selectTitles: PropTypes.arrayOf(PropTypes.string),
};

export default SelectView;
