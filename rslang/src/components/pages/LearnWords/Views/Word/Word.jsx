import React from 'react';
import PropTypes from 'prop-types';

const Word = ({
  textExample,
  textExampleTranslate,
  isShownTranslation,
}) => (
  <div>
    {/* //TODO: part of the word, where user will enter the word will be styled by myself */}
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
