import React from 'react';
import PropTypes from 'prop-types';

import standartImageAssociation from '../../assets/blank.jpg';
import { apiLinks } from '../../helpers/constants';

const WordAssociation = ({ currentActiveWords, recognitionResults }) => {
  if (currentActiveWords.length === 0) {
    return (
      <div className="word-association">
        <img src={standartImageAssociation} alt="association" className="word-association__img"></img>
    <p className="word-association__translation">{recognitionResults}</p>
      </div>
    );
  }

  const { image, wordTranslate } = currentActiveWords[currentActiveWords.length - 1];
  return (
    <div className="word-association">
      <img src={`${apiLinks.file}${image}`} alt="association" className="word-association__img"></img>
      <p className="word-association__translation">{recognitionResults === null ? wordTranslate : recognitionResults}</p>
    </div>
  );
};

WordAssociation.propTypes = {
  currentActiveWords: PropTypes.array,
  recognitionResults: PropTypes.string,
};

export default WordAssociation;
