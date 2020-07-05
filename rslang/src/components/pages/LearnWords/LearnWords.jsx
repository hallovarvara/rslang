import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Views/Header';
import WordCard from './Views/WordCard';
import * as settings from './helpers/settings';

export default class LearnWords extends Component {
  state = {
    wordCount: 0,
    totalWords: 0,
    isAutoPlay: false,
    currentWord: '',
  };

  toggleAutoPlay = () => {
    const { isAutoPlay } = this.state;
    this.setState({
      isAutoPlay: !isAutoPlay,
    });
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      totalWords: data.length + 1,
    });
  }

  render() {
    const { data } = this.props;
    const { wordCount } = this.state;
    const currentWord = data[wordCount];
    const {
      textExample,
      textExampleTranslate,
      image,
      word,
      transcription,
      textMeaning,
      textMeaningTranslate,
    } = currentWord;
    const {
      baseUrl,
      isShownComplicatedButton,
      isShownAnswerButton,
      isShownImageAssociation,
      isShownTranslation,
      isShownTranscription,
      isShownExampleSentence,
      isShownMeaning,
      categoriesSelect,
    } = settings;
    return (
      <div>
        <Header categoriesSelect={categoriesSelect} />
        <WordCard
          textExample={textExample}
          textExampleTranslate={textExampleTranslate}
          image={image}
          word={word}
          transcription={transcription}
          textMeaning={textMeaning}
          textMeaningTranslate={textMeaningTranslate}
          baseUrl={baseUrl}
          isShownComplicatedButton={isShownComplicatedButton}
          isShownAnswerButton={isShownAnswerButton}
          isShownImageAssociation={isShownImageAssociation}
          isShownTranslation={isShownTranslation}
          isShownTranscription={isShownTranscription}
          isShownExampleSentence={isShownExampleSentence}
          isShownMeaning={isShownMeaning}
        />
      </div>
    );
  }
}

LearnWords.propTypes = {
  data: PropTypes.array,
};

LearnWords.defaultProps = {
  data: [],
};
