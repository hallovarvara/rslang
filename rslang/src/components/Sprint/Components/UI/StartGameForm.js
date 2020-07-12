import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { text } from '../../../../helpers/constants';

export default function StartGameForm({ classNameForm, handleCurrentGroup, onSubmitForm }) {
  const menuItemList = [...text.ru.levelsTitles];
  menuItemList.shift();

  return (
    <form className={classNameForm} onSubmit={onSubmitForm}>
      <FormControl
        required
      >
        <InputLabel id="select-label" style={{ fontSize: '1.2rem' }} >
          {text.ru.chooseLevel}
        </InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          onChange={handleCurrentGroup}
          defaultValue=""
        >
          {menuItemList.map((value, key) => (
            <MenuItem value={key} key={key}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<PlayCircleOutlineIcon />}
        style={{ background: 'rgba(130, 115, 228, 1)' }}
      >
        {text.ru.button.startGame}
      </Button>
    </form >
  );
}
StartGameForm.propTypes = {
  classNameForm: PropTypes.string,
  handleCurrentGroup: PropTypes.func,
  onSubmitForm: PropTypes.func,
};
