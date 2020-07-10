import React from 'react';
import PropTypes from 'prop-types';

const CheckedSentense = ({ sentence, styles }) => (
  <p style={styles}>
    {sentence.map((el, i) => (
      <span
        key={i}
        style={{ color: el.color }}
      >
        {el.letter}
      </span>
    ))}
  </p>
);

CheckedSentense.propTypes = {
  sentence: PropTypes.array,
  styles: PropTypes.object,
};

export default CheckedSentense;
