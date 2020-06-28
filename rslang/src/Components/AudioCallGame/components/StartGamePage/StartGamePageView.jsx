import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from '@material-ui/core';
import { levelArray } from '../../constants';
import style from './StartGamePageView.module.scss';

const StartGamePageView = ({
  handleChooseLevel,
  level, setNumberLevel,
  setNumberAnswers,
  handleSubmitForm,
}) => {
  const options = levelArray.map((item) => (
    <option value={item} key={item}>{`Уровень: ${item}`}</option>
  ));
  return (
    <div className={style.container}>
      <h2 className={style.title}>Aудиовызов</h2>
      <p className={style.text}>Тренировка улучшает восприятие англиской речи на слух</p>
      <form className={style.form} onSubmit={handleSubmitForm}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-level-native-simple">Выберите уровень</InputLabel>
          <Select
            native
            value={level}
            onChange={handleChooseLevel}
            label="Выберите уровень"
            inputProps={{
              name: 'level',
              id: 'outlined-level-native-simple',
            }}
          >
            {options}
          </Select>
        </FormControl>
        <TextField
          required
          className={style.input}
          id="audiocall-start__questions"
          label="Количество вопросов от 5 до 12"
          inputProps={{ pattern: '[0-9]', min: '5', max: '12' }}
          variant="filled"
          onChange={setNumberLevel}
        />
        <TextField
          required
          id="audiocall-start__questions"
          label="Количество ответов от 2 до 5"
          inputProps={{ pattern: '[2-5]' }}
          variant="filled"
          onChange={setNumberAnswers}
        />
        <Button
          type="submit"
          variant="contained"
        >
          Начать игру
        </Button>
      </form>
    </div>
  );
};

StartGamePageView.propTypes = {
  handleChooseLevel: PropTypes.func,
  level: PropTypes.number,
  setNumberLevel: PropTypes.func,
  setNumberAnswers: PropTypes.func,
  handleSubmitForm: PropTypes.func,
};

export default StartGamePageView;
