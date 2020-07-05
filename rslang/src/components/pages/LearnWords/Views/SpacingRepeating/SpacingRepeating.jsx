import React from 'react';
import PropTypes from 'prop-types';

const handleHardWord = (word) => {
  console.log('hard', word);
};

const handleNormalWord = (word) => {
  console.log('normal', word);
};

const handleEasylWord = (word) => {
  console.log('easy', word);
};

const SpacingRepeating = (props) => {
  const { word } = props;
  return (
    <div>
      <button onClick={() => handleHardWord(word)}>
        <span>Трудно</span>
        <span>+ 2 повтора</span>
      </button>
      <button onClick={() => handleNormalWord(word)}>
        <span>Хорошо</span>
        <span>+ 1 повтор</span>
      </button>
      <button onClick={() => handleEasylWord(word)}>
        <span>Легко</span>
        <span>без повтора</span>
      </button>
    </div>
  );
};

SpacingRepeating.propTypes = {
  word: PropTypes.object,
};

export default SpacingRepeating;
