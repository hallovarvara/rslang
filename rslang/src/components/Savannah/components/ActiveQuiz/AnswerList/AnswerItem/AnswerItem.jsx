import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './AnswerItem.module.scss';

class AnswerItem extends Component {
  componentDidMount() {
    document.addEventListener('keyup', this.props.keyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.props.keyPressed);
  }

  render() {
    const {
      id, guessedWords, trueAnswer, state, value,
    } = this.props;
    const cls = [classes.AnswerItem];
    if (state) {
      cls.push(classes[state]);
    }
    if (trueAnswer) {
      cls.push(classes[trueAnswer]);
    }

    return (
      <span
        className={cls.join(' ')}
        id={id}
        onClick={guessedWords}
        key={id}
      >
        {value}
      </span>
    );
  }
}

AnswerItem.propTypes = {
  id: PropTypes.string,
  guessedWords: PropTypes.func,
  trueAnswer: PropTypes.string,
  state: PropTypes.string,
  value: PropTypes.string,
  keyPressed: PropTypes.func,
};

AnswerItem.defaultProps = {
  id: '',
  guessedWords: () => { },
  trueAnswer: '',
  state: '',
  value: '',
  keyPressed: () => { },
};

export default AnswerItem;
