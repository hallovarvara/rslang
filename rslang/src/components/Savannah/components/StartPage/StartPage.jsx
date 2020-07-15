import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Switcher from '../UI/switch';

import { count, gamesData, text } from '../../../../helpers/constants';

import classes from './StartPage.module.scss';

const {
  defaultLevel, minQuestions, maxQuestions, minAnswers, maxAnswers,
} = count.savannah;

const StartPage = ({
  onTotalQuizUpdate, onSubmitForm, handleCurrentGroup, handleChangeUserWords,
  handleTotalAnswer, totalAnswers, totalQuestions, token,
}) => {
  const errorAnswer = totalAnswers > maxAnswers
    || totalAnswers < minAnswers
    || !totalAnswers;

  const errorQuiz = totalQuestions > maxQuestions
    || totalQuestions < minQuestions
    || !totalQuestions;

  const menuItemList = text.ru.levelsTitles;

  return (
    <div className={classes.StartPage}>
      <h1>{gamesData.savannah.title}</h1>
      <form className={classes.form} onSubmit={(!errorQuiz && !errorAnswer) ? onSubmitForm : null}>
        <FormControl className={classes.formControl} required>
          <InputLabel id="select-label">
            {text.ru.chooseLevel}
          </InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            defaultValue={defaultLevel}
            onChange={(event) => handleCurrentGroup(event)}
          >
            {menuItemList.map((value, key) => (
              <MenuItem value={key} key={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          error={errorQuiz}
          id="savannah-start__questions"
          label={`${text.ru.howManyWords} (${minQuestions}—${maxQuestions})`}
          value={totalQuestions}
          variant="filled"
          onChange={onTotalQuizUpdate}
          style={{ margin: '20px 0' }}
        />
        <TextField
          required
          error={errorAnswer}
          id="savannah-start__answers"
          label={`${text.ru.howManyAnswers} (${minAnswers}—${maxAnswers})`}
          inputProps={{ pattern: '[2-5]' }}
          variant="filled"
          onChange={handleTotalAnswer}
          style={{ marginBottom: 20 }}
          value={totalAnswers}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<PlayCircleOutlineIcon />}
          style={{ background: 'rgba(130, 115, 228, 1)' }}
        >
          {text.ru.button.startGame}
        </Button>

        {token
          ? (<React.Fragment>
            <Switcher
              handleChangeUserWords={handleChangeUserWords}
            />
            <span className={classes.startExplanation}>
              {text.ru.notEnoughWords}
            </span>
          </React.Fragment>)
          : null
        }
      </form >
    </div >);
};

StartPage.propTypes = {
  onTotalQuizUpdate: PropTypes.func,
  onSubmitForm: PropTypes.func,
  handleCurrentGroup: PropTypes.func,
  handleTotalAnswer: PropTypes.func,
  totalAnswers: PropTypes.number,
  totalQuestions: PropTypes.number,
  token: PropTypes.string,
  handleChangeUserWords: PropTypes.func,
};

StartPage.defaultProps = {
  onTotalQuizUpdate: () => { },
  onSubmitForm: () => { },
  handleCurrentGroup: () => { },
  handleTotalAnswer: () => { },
  totalAnswers: 0,
  totalQuestions: 0,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
export default connect(mapStateToProps)(StartPage);
