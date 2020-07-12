import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { count, gamesData, text } from '../../../../helpers/constants';

import classes from './StartPage.module.scss';

const StartPage = ({
  onTotalQuizUpdate, onSubmitForm, handleCurrentGroup,
  handleTotalAnswer, totalAnswers, totalQuestions,
}) => {
  const errorAnswer = totalAnswers > count.savannah.maxAnswers
    || totalAnswers < count.savannah.minAnswers
    || !totalAnswers;

  const errorQuiz = totalQuestions > count.savannah.maxQuestions
    || totalQuestions < count.savannah.minQuestions
    || !totalQuestions;

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    handleCurrentGroup(event);
  };

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
            value={age}
            onChange={handleChange}
          >
            {menuItemList.map((value, key) => (
              <MenuItem value={key - 1} key={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          error={errorQuiz}
          id="savannah-start__questions"
          label={`${text.ru.howManyWords} (${count.savannah.minQuestions}—${count.savannah.maxQuestions})`}
          variant="filled"
          onChange={onTotalQuizUpdate}
          style={{ margin: '20px 0' }}
        />
        <TextField
          required
          error={errorAnswer}
          id="savannah-start__answers"
          label={`${text.ru.howManyAnswers} (${count.savannah.minAnswers}—${count.savannah.maxAnswers})`}
          inputProps={{ pattern: '[2-5]' }}
          variant="filled"
          onChange={handleTotalAnswer}
          style={{ marginBottom: 20 }}
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
};

StartPage.defaultProps = {
  onTotalQuizUpdate: () => { },
  onSubmitForm: () => { },
  handleCurrentGroup: () => { },
  handleTotalAnswer: () => { },
  totalAnswers: 0,
  totalQuestions: 0,
};

export default StartPage;
