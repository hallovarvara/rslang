import React from 'react';
import VocabularyView from './VocabularyPage.jsx';
import { selectorOptions } from '../../../helpers/constants';
import { wordsData } from '../../../helpers/wordsData';

const VocabularyPage = () => {
  const changeVocabularyType = () => {
    // TODO: This function will change vocabulary type in State
  };

  return (
      <VocabularyView
        words = { wordsData }
        selectorOptions = { selectorOptions }
        changeVocabularyType = { changeVocabularyType }
        selectedOption = { 'removed' } // TODO: replace selectedOption with state data
      />
  );
};

export default VocabularyPage;
