import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Switcher({ handleChangeUserWords }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch
          onChange={handleChangeUserWords}
          name="checkedUserWords"
          color="primary"
        />}
        label="Слова из словаря*"
      />
    </FormGroup>
  );
}
Switcher.propTypes = {
  handleChangeUserWords: PropTypes.string,
};
