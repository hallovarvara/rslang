import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { zoomInLeft } from 'react-animations';

import AnswerList from './AnswerList';

import classes from './ActiveQuiz.module.scss';

const Zoom = styled.div`animation: 2s ${keyframes`${zoomInLeft}`}`;

const ActiveQuiz = ({
  guessedWords, translateWords, id, state, activeQuestion,
}) => (
    <div className={classes.ActiveQuiz}>
      <AnswerList
        guessedWords={guessedWords}
        translateWords={translateWords}
        id={id}
        state={state}
      />
      {
        !state && translateWords
          ? (
            <Zoom>
              <div className={classes.Question}>
                {activeQuestion}
              </div>
            </Zoom>
          )
          : null
      }
    </div>);

ActiveQuiz.propTypes = {
  guessedWords: PropTypes.func,
  translateWords: PropTypes.array,
  id: PropTypes.array,
  state: PropTypes.array,
  activeQuestion: PropTypes.string,
};

ActiveQuiz.defaultProps = {
  guessedWords: () => { },
  translateWords: [],
  id: [],
  state: null,
  activeQuestion: '',
};

export default ActiveQuiz;
