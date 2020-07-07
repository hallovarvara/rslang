import React from 'react';
import WordCard from './WordCard';
import { pagesData } from "../../../helpers/constants";

const VocabularyView = ( { selectorOptions, changeVocabularyType, selectedOption, words } ) => {
  const options = selectorOptions.map( ([ key, value ]) => <option value={ key } key={ key }> { value } </option> );
  const cards = words.map( (word) => <WordCard wordData={ word } key={ word.id } />)

  const onSelectorChange = ( e ) => {
    e.persist();
    changeVocabularyType( e );
  };

  return (
    <div>
      <h2 className="title">{pagesData.vocabulary.title}</h2>
      <select className="vocabulary-selector" onChange={ ( e ) => onSelectorChange( e ) }
        value={ selectedOption } >
        { options }
      </select>
      <div className="cards-container"> { cards } </div>
    </div>
  )
}

export default VocabularyView;
