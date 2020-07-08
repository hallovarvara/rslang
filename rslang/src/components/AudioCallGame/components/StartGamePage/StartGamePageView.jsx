import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from '@material-ui/core';
import {buttonTextContent, wordsGroups, formLabel, gamesData} from '../../../../helpers/constants';
import style from './StartGamePageView.module.scss';

const StartGamePageView = ({
  handleChooseLevel,
  level,
  setNumberLevel,
  setNumberAnswers,
  handleSubmitForm,
}) => {
  const options = [];
  for (let numberLevel = 0; numberLevel <= wordsGroups; numberLevel += 1) {
    options.push(<option value={numberLevel} key={numberLevel}>{`${formLabel.level} ${numberLevel}`}</option>);
  }
  return (
    <div className={style.container}>
      <h1 className={style.title}>{gamesData.audiocall.title}</h1>
      <p className={style.text}>Тренировка улучшает восприятие английского на слух</p>
      <form className={style.form} onSubmit={handleSubmitForm}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-level-native-simple">{formLabel.chooseLevel}</InputLabel>
          <Select
            native
            value={level || 0}
            onChange={handleChooseLevel}
            label={formLabel.chooseLevel}
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
          type="number"
          label={formLabel.questions}
          defaultValue="5"
          inputProps={{ pattern: '[0-9]', min: '5', max: '12' }}
          variant="filled"
          onChange={setNumberLevel}
        />
        <TextField
          required
          id="audiocall-start__questions"
          type="number"
          label={formLabel.answers}
          defaultValue="5"
          inputProps={{ pattern: '[2-5]', min: '2', max: '5' }}
          variant="filled"
          onChange={setNumberAnswers}
        />
        <Button
          type="submit"
          variant="contained"
        >
         {buttonTextContent.startGame}
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
