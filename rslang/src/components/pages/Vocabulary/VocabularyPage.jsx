import React from 'react';
import PropTypes from 'prop-types';
import WordCard from './WordCard';
import { pagesData } from '../../../helpers/constants';

import Select from '../../../basicComponents/Select';

const VocabularyView = ({
  selectorOptions,
  changeVocabularyType,
  words,
}) => {
  const cards = words.map((word) => <WordCard wordData={ word } key={ word.id } />);

  const onSelectorChange = (e) => {
    e.persist();
    changeVocabularyType(e);
  };

  return (
    <div className="vocabulary-page vocabulary-page-container">
      <div className="vocabulary-settings-container">
        <h1 className="vocabulary-settings-container__page-title">{pagesData.vocabulary.title}</h1>
        <Select
          className="vocabulary-selector"
          onChange={ (e) => onSelectorChange(e) }
          selectTitles={ selectorOptions } >
        </Select>
      </div>
      <div className="cards-container"> { cards } </div>
    </div>
  );
};

VocabularyView.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  selectedOption: PropTypes.string,
  changeVocabularyType: PropTypes.func,
  selectorOptions: PropTypes.arrayOf(PropTypes.string),
};

export default VocabularyView;
