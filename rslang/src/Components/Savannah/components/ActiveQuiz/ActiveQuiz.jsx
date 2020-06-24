import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { zoomInLeft } from 'react-animations';

import AnswerList from './AnswerList';

import classes from './ActiveQuiz.module.scss';

const Zoom = styled.div`animation: 2s ${keyframes`${zoomInLeft}`}`;

class ActiveQuiz extends Component {
  componentDidUpdate() {
    if (this.props.timer === 6) this.props.onDefault();
  }

  componentDidMount() {
    this.props.onTimeOut();
  }

  render() {
    const {
      guessedWords, translateWords, id, state, activeQuestion, keyPressed,
    } = this.props;
    return (
      <div className={classes.ActiveQuiz}>
        <AnswerList
          guessedWords={guessedWords}
          translateWords={translateWords}
          id={id}
          state={state}
          keyPressed={keyPressed}
        />
        {
          (!state && translateWords)
          && (<Zoom>
            <div className={classes.Question}>
              {activeQuestion}
            </div>
          </Zoom>)
        }
      </div>);
  }
}

ActiveQuiz.propTypes = {
  guessedWords: PropTypes.func,
  translateWords: PropTypes.array,
  id: PropTypes.array,
  state: PropTypes.array,
  activeQuestion: PropTypes.string,
  keyPressed: PropTypes.func,
  timer: PropTypes.number,
  onDefault: PropTypes.func,
  onTimeOut: PropTypes.func,
};

ActiveQuiz.defaultProps = {
  guessedWords: () => { },
  translateWords: [],
  id: [],
  state: null,
  activeQuestion: '',
  keyPressed: () => { },
  timer: 0,
  onDefault: () => { },
  onTimeOut: () => { },
};

export default ActiveQuiz;
