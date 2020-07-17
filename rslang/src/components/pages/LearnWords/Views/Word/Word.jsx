import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  inputField,
  inputWrapper,
} from '../../helpers/style-options';
import {
  showDifferenceInWords,
  prepareRightAnswerStyles,
  prepareWrongAnswerStyles,
} from '../../helpers';
import { buttonsNames } from '../../helpers/constants';
import CheckedSentense from '../CheckedSentence';

class Word extends Component {
  state = {
    value: '',
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ value });
    const {
      onChangeProgress,
      progress: { difference },
    } = this.props;
    if (value && difference) {
      onChangeProgress({ isShownWord: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const currentWord = this.props.textExample.emphasis;
    const inputWord = this.state.value;
    if (currentWord !== inputWord) {
      this.handleError(currentWord, inputWord);
    } else {
      this.handleSuccess();
    }
    this.setState({
      value: '',
    });
  };

  handleError = (currentWord, inputWord) => {
    const { onChangeProgress, onStatsChanged } = this.props;
    const difference = showDifferenceInWords(currentWord, inputWord);
    onChangeProgress({ isShownWord: true, difference });
    onStatsChanged(false);
    setTimeout(() => {
      onChangeProgress({ isWordSemiOpacity: true });
    }, 2000);
  };

  handleSuccess = () => {
    const { onChangeProgress, onPlayAudio, onStatsChanged } = this.props;
    onChangeProgress({
      isGuessed: true,
      isShownWord: true,
      difference: null,
    });
    onStatsChanged(true);
    onPlayAudio();
  };

  render() {
    const {
      progress,
      textExample,
      textExampleTranslate,
      isShownTranslation,
      onPlayAudio,
    } = this.props;
    const { begin, emphasis, end } = textExample;
    const {
      isGuessed,
      isShownWord,
      isWordSemiOpacity,
      difference,
    } = progress;
    const { value } = this.state;
    const wrongAnswerStyles = prepareWrongAnswerStyles(
      isShownWord,
      isWordSemiOpacity,
    );
    const rightAnswerStyles = prepareRightAnswerStyles(isGuessed);
    const output = difference ? (
      <CheckedSentense sentence={difference} styles={wrongAnswerStyles} />
    ) : (
      <span style={rightAnswerStyles}>{emphasis}</span>
    );
    return (
      <div>
        <div>
          {isGuessed && (
            <button onClick={() => onPlayAudio('audioExample')}>{buttonsNames.PLAY}</button>
          )}
          <span>{begin}</span>
          <div style={{ position: 'relative', display: 'inline' }}>
            {output}
            <form style={inputWrapper} onSubmit={this.handleSubmit}>
              <input
                type="text"
                style={inputField}
                autoComplete="off"
                autoFocus="on"
                disabled={isGuessed}
                onChange={this.handleInput}
                value={value}
              />
            </form>
          </div>
          <span style={{ marginLeft: '10px' }}>{end}</span>
        </div>
        <button disabled={!value} onClick={this.handleSubmit}>
          {buttonsNames.CHECK_ANSWER}
        </button>
        {isGuessed && isShownTranslation && <p>{textExampleTranslate}</p>}
      </div>
    );
  }
}

Word.propTypes = {
  progress: PropTypes.object,
  textExampleTranslate: PropTypes.string,
  textExample: PropTypes.object,
  isShownTranslation: PropTypes.bool,
  onChangeProgress: PropTypes.func,
  onPlayAudio: PropTypes.func,
  onStatsChanged: PropTypes.func,
};

export default Word;
