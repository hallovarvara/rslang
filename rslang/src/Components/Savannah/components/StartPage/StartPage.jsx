import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { TOTAL_GROUP } from '../services/constants';

import classes from './StartPage.module.scss';

const StartPage = ({
  onTotalQuizUpdate, onSubmitForm, handleCurrentGroup, handleTotalAnswer,
}) => (
    <div className={classes.StartPage}>
      <div className={classes.titleName}>SAVANAH GAME</div>
      <form className={classes.form} onSubmit={onSubmitForm}>
        <select
          onChange={handleCurrentGroup}
        >
          <option disabled selected
          >Выберите уровень:</option>
          <option
            value="-1"
          >Уровень: all</option>
          {Array(TOTAL_GROUP).fill('').map((value, key) => (
            <option value={key} key={key}>{`Уровень: ${key + 1}`}</option>
          ))
          }
        </select>
        <TextField
          required
          id="savannah-start__questions"
          label="Количество вопросов от 5 до 100"
          inputProps={{ pattern: '[5-100]' }}
          variant="filled"
          onChange={onTotalQuizUpdate}

        />
        <TextField
          required
          id="savannah-start__questions"
          label="Количество ответов от 2 до 6"
          inputProps={{ pattern: '[2-6]' }}
          variant="filled"
          onChange={handleTotalAnswer}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<PlayCircleOutlineIcon />}
        >
          PLAY
      </Button>
      </form>
    </div >);

StartPage.propTypes = {
  onTotalQuizUpdate: PropTypes.func,
  onSubmitForm: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  handleTotalAnswer: PropTypes.func,
};

StartPage.defaultProps = {
  onTotalQuizUpdate: () => { },
  onSubmitForm: () => { },
  handleCurrentGroup: () => { },
  handleTotalAnswer: () => { },
};

export default StartPage;
