import React from 'react';
import Parser from 'html-react-parser';
import IconNoWordsFound from '../../../../../assets/icons/icon-learn-words-select-error.svg'
import { text } from '../../../../../helpers/constants';

const NoWordsFound = ({note = text.ru.noWordsFound}) => (
  <div className="lw-no-words-found">
    <img src={IconNoWordsFound} alt={Parser(text.ru.noWordsFound)} />
    <p>{Parser(note)}</p>
  </div>
);

export default NoWordsFound;
