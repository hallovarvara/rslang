import React from 'react';
import PropTypes from 'prop-types';

const Word = ({
  textExample,
  textExampleTranslate,
  isShownTranslation,
}) => (
  <div>
    {/* part of the word, where user will enter the word will be S styled by myself from React */}
    <h3>{textExample}</h3>
    {isShownTranslation && <p>{textExampleTranslate}</p>}
  </div>
);

Word.propTypes = {
  textExampleTranslate: PropTypes.string,
  textExample: PropTypes.string,
  isShownTranslation: PropTypes.bool,
};

export default Word;
