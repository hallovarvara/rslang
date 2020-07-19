import React from 'react';
import WordCard from './WordCard';
import {
  pagesData,
  vocabularySelectorOptions as selectorOptions,
  localStorageItems,
} from '../../../helpers/constants';

import Select from '../../../basicComponents/Select';
// import { getWords } from '../../../helpers/wordsService';
import Preloader from '../../../basicComponents/Preloader';
import Pagination from '../../../basicComponents/Pagination';
import NoWordsFound from '../LearnWords/Views/NoWordsFound';

import UserService from '../../../helpers/userService';

const amountOfWordsPerPage = 5;

const userService = new UserService();

// const getWords = () => (
//   [
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: true,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'search',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bcf21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'hello',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35aseb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'fo',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72afsbc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: true,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'mum',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72afbc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: true,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'dad',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35afseb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'son',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bqwrc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'apple',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e7qrw2bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: true,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: true,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'mandarin',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bc2wqrw1aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'store',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bc21affqrrq65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'game',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e7jkj2bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'width',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5eekjk35eb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: true,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'height',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9kjkjke72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'school',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35kjkjeb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'university',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35ebkjkkj9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'freedom',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bckjkkj21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: true,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'healthy',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9fkkjkj5ee35eb9e72bc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: false,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'meal',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//     {
//       audio: 'files/18_2758.mp3',
//       audioExample: 'files/18_2758_example.mp3',
//       audioMeaning: 'files/18_2758_meaning.mp3',
//       group: 4,
//       id: '5e9f5ee35eb9e72bxzcc21aff65',
//       image: 'files/18_2758.jpg',
//       page: 17,
//       progress: {
//         difference: null,
//         isComplicated: true,
//         isDifficultChosen: true,
//         isGuessed: true,
//         isRemoved: false,
//         isShownWord: true,
//         isUsedTip: true,
//         isWordSemiOpacity: false,
//         mistaken: false,
//         secondRepeat: true,
//         thirdRepeat: true,
//       },
//       textExample: 'I <b>searched</b> the newspaper for a new job.',
//       textExampleTranslate: 'Я искал в газете новую работу',
//       textMeaning: 'To <i>search</i> for something or someone means to look for them carefully.',
//       textMeaningTranslate: 'Искать что-то или кого-то означает искать их внимательно',
//       transcription: '[səːrtʃ]',
//       userWord: {
//         difficulty: false,
//         optional: {
//           next: '22.07.2020',
//           rate: 3,
//           removed: false,
//           repeated: 2,
//           stamp: 1595401599543,
//         },
//       },
//       word: 'milk',
//       wordTranslate: 'поиск',
//       wordsPerExampleSentence: 8,
//     },
//   ]
// );

class VocabularyView extends React.Component {
  state = {
    loading: true,
    filteredWords: [],
    currentPage: 1,
  }

  componentDidMount() {
    this.userId = localStorage.getItem(localStorageItems.userId);
    userService.getUserAllWords(this.userId)
      .then((result) => {
        this.vocabularyWords = result || [];
        this.setState({
          filteredWords: this.vocabularyWords.map((obj) => obj.word),
          loading: false,
        });
      });
  }

  currentPageChanged = (event, page) => {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    const {
      loading,
      filteredWords,
      currentPage,
    } = this.state;

    if (loading) {
      return <Preloader />;
    }

    if (!filteredWords.lenght) {
      return <NoWordsFound />;
    }

    const cards = filteredWords
      .slice(amountOfWordsPerPage * (currentPage - 1), currentPage * amountOfWordsPerPage)
      .map((word) => <WordCard wordData={ word } key={ word._id || word.id } />);

    return (
      <div className="vocabulary-page vocabulary-page-container">
        <div className="vocabulary-settings-container">
          <h1 className="vocabulary-settings-container__page-title">{pagesData.vocabulary.title}</h1>
          <Select
            className="vocabulary-selector"
            onChange={(event) => {
              const newSelectedOption = event.target.value;
              const newFilterPath = selectorOptions.find((option) => (
                option.title.toLowerCase() === newSelectedOption.toLowerCase()
              )).fieldPath;
              if (newFilterPath === null) {
                this.setState({
                  filteredWords: this.vocabularyWords.map((obj) => obj.word),
                  currentPage: 1,
                });
              } else {
                const pathFields = newFilterPath.split(' ');
                const newFilteredWords = this.vocabularyWords.filter((obj) => {
                  let result = obj;
                  for (let i = 0; i < pathFields.length; i += 1) {
                    if (result[pathFields[i]] === undefined) {
                      return false;
                    }
                    result = result[pathFields[i]];
                  }
                  return JSON.parse(result);
                });
                this.setState({
                  filteredWords: newFilteredWords.map((obj) => obj.word),
                  currentPage: 1,
                });
              }
            }}
            selectTitles={ selectorOptions.map((option) => option.title) } >
          </Select>
        </div>
        <div className="cards-container"> { cards } </div>
        <Pagination
          page={currentPage}
          onChange={this.currentPageChanged}
          className="vocabulary-page__pagination"
          count={Math.ceil(filteredWords.length / amountOfWordsPerPage)}/>
      </div>
    );
  }
}

export default VocabularyView;
