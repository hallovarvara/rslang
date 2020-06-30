import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';

import { WordsServiceProvider } from './components/contexts/words-service-context';
import WordsService from './services/words-service';
import { RecognitionServiceProvider } from './components/contexts/recognition-service-context';
import RecognitionService from './services/recognition-service';
import { LocalStorageServiceProvider } from './components/contexts/local-storage-service-context';
import LocalStorageService from './services/local-storage-service';

const wordsService = new WordsService();
const recognitionService = new RecognitionService();
const localStorageService = new LocalStorageService();

const Speakit = () => (
  <WordsServiceProvider value={wordsService}>
    <RecognitionServiceProvider value={recognitionService}>
      <LocalStorageServiceProvider value={localStorageService}>
          <Route path="/" component={App} />
      </LocalStorageServiceProvider>
    </RecognitionServiceProvider>
  </WordsServiceProvider>
);

export default Speakit;
