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

import { text } from '../../../helpers/constants';
import {
  localThings
} from '../../../helpers/wordsService/storageModel';

import UserService from '../../../helpers/userService';

const amountOfWordsPerPage = 5;

const userService = new UserService();

class VocabularyView extends React.Component {
  state = {
    loading: true,
    filteredWords: [],
    currentPage: 1,
  }

  componentDidMount() {
    this.vocabularyWords = JSON.parse(localStorage.getItem(localThings.WORDS) || '[]');
    setTimeout(() => {
      this.setState({
        loading: false,
        filteredWords: this.vocabularyWords,
      })
    }, 1500)
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
                  filteredWords: this.vocabularyWords,
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
                  filteredWords: newFilteredWords,
                  currentPage: 1,
                });
              }
            }}
            selectTitles={ selectorOptions.map((option) => option.title) } >
          </Select>
        </div>
        {
          filteredWords.length
            ? <>
            <div className="cards-container"> { cards } </div>
            <Pagination
            page={currentPage}
            onChange={this.currentPageChanged}
            className="vocabulary-page__pagination"
            count={Math.ceil(filteredWords.length / amountOfWordsPerPage)}/>
          </> : <NoWordsFound note={text.ru.noWordsInVocabulary} />
        }
      </div>
    );
  }
}

export default VocabularyView;
