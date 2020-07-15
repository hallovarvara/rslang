import React from 'react';
import { WordsServiceConsumer } from '../contexts/words-service-context';

const withWordsService = () => (Wrapped) => (props) => (
  <WordsServiceConsumer>
    {
      (wordsService) => <Wrapped {...props} wordsService={wordsService}/>
    }
  </WordsServiceConsumer>
);

export default withWordsService;
