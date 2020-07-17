import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { text } from '../../../../helpers/constants';

export default function StartGameForm({ classNameForm, onSubmitForm }) {

  return (
    <form className={classNameForm} onSubmit={onSubmitForm}>
      <Button
        className="sprint-start__button"
        type="submit"
        variant="contained"
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
