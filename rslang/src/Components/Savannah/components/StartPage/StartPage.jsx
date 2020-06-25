import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
  ANSWERS_TOTAL_MIN, ANSWERS_TOTAL_MAX, QUESTIONS_TOTAL_MIN, QUESTIONS_TOTAL_MAX,
} from '../services/constants';

import classes from './StartPage.module.scss';

const StartPage = ({
  onTotalQuizUpdate, onSubmitForm, handleCurrentGroup,
  handleTotalAnswer, totalAnswers, totalQuestions,
}) => {
  const errorAnswer = totalAnswers > ANSWERS_TOTAL_MAX
    || totalAnswers < ANSWERS_TOTAL_MIN
    || !totalAnswers;

  const errorQuiz = totalQuestions > QUESTIONS_TOTAL_MAX
    || totalQuestions < QUESTIONS_TOTAL_MIN
    || !totalQuestions;

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    handleCurrentGroup(event);
  };

  return (
    <div className={classes.StartPage}>
      <div className={classes.titleName}>SAVANAH GAME</div>
      <form className={classes.form} onSubmit={(!errorQuiz && !errorAnswer) ? onSubmitForm : null}>
        <FormControl className={classes.formControl} required>
          <InputLabel id="select-label">Уровень</InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={-1}>Все</MenuItem>
            <MenuItem value={0}>Первый</MenuItem>
            <MenuItem value={1}>Второй</MenuItem>
            <MenuItem value={2}>Третий</MenuItem>
            <MenuItem value={3}>Четвертый</MenuItem>
            <MenuItem value={4}>Пятый</MenuItem>
            <MenuItem value={5}>Шестой</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          error={errorQuiz}
          id="savannah-start__questions"
          label="Количество вопросов от 5 до 50"
          variant="filled"
          onChange={onTotalQuizUpdate}
          style={{ margin: '20px 0' }}

        />
        <TextField
          required
          error={errorAnswer}
          id="savannah-start__answers"
          label="Количество ответов от 2 до 5"
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
          PLAY
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
