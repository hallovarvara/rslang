import React from 'react';
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';

import classes from './AnswerList.module.scss';

const AnswerList = ({
  translateWords, id, guessedWords, state, keyPressed,
}) => {
  const trueNumberAnswer = state ? Object.keys(state[1])[0] : null;

  return (
    <div className={classes.words}>

      {translateWords.map((value, key) => (
        <AnswerItem
          key={key}
          id={id[key]}
          guessedWords={guessedWords}
          value={`${key + 1} ${value}`}
          state={state ? state[0][id[key]] : null}
          trueAnswer={state && key === +trueNumberAnswer ? state[1][trueNumberAnswer] : null}
          keyPressed={keyPressed}
        />
      ))
      }
    </div >
  );
};

AnswerList.propTypes = {
  translateWords: PropTypes.array,
  id: PropTypes.array,
  guessedWords: PropTypes.func,
  state: PropTypes.array,
  keyPressed: PropTypes.func,
};

export default AnswerList;
