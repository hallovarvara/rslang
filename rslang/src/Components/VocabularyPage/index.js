import React from 'react';
import VocabularyView from './VocabularyPage.jsx';
import { selectorOptions } from '../../Helpers/constants';
import { wordsData } from '../../Helpers/wordsData';

const VocabularyPage = ( props ) => {

  const changeVocabularyType = (e) => {
    //TODO: This function will change vocabulary type in State
  }

  return (
      <VocabularyView 
        words = { wordsData } 
        selectorOptions = { selectorOptions }
        changeVocabularyType = { changeVocabularyType }
        selectedOption = { "removed" } // TODO: replace selectedOption with state data
      />
  )
}


export default VocabularyPage;
