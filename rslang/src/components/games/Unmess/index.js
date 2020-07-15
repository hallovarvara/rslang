import React from 'react';

import App from './App';

import { WordsServiceProvider } from '../contexts/words-service-context';
import WordsService from '../services/words-service';

const wordsService = new WordsService();

const Unmess = () => (
  <WordsServiceProvider value={wordsService}>
    <App />
  </WordsServiceProvider>
);

export default Unmess;
