import React from 'react';
import PropTypes, { object } from 'prop-types';
import { replaceAudioSrc } from '../../helpers';
import QuestionView from './QuestionView.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  generateAudio() {
    const { question, level } = this.props;
    if (question.length !== 0 && question.length !== level) {
      const { audio, id, word } = question[level];
      this.id = id;
      this.audio = new Audio(replaceAudioSrc(audio));
      const playPromise = this.audio.play();
      console.log(word, 15);
      if (playPromise) {
        playPromise
          .then((res) => {
            console.log('audio played auto');
          })
          .catch((error) => {
            console.log('playback prevented');
          });
      }
    }
  }

  render() {
    const { question, level, isFalseAnswer, isRightAnswer } = this.props;
    this.generateAudio();
    return (
      <QuestionView
        question={question}
        level={level}
        isFalseAnswer={isFalseAnswer}
        isRightAnswer={isRightAnswer}
      />
    );
  }
}

Question.propTypes = {
  question: PropTypes.array,
  level: PropTypes.number,
  isFalseAnswer: PropTypes.bool,
  isRightAnswer: PropTypes.bool,
};

export default Question;
