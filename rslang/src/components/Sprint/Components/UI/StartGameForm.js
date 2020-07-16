import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { text } from '../../../../helpers/constants';

export default function StartGameForm({ classNameForm, onSubmitForm }) {

  return (
    <form className={classNameForm} onSubmit={onSubmitForm}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<PlayCircleOutlineIcon />}
        style={{ background: 'rgba(130, 115, 228, 1)', height: 60, marginTop: 30 }}
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
