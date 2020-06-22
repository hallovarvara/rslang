import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

const AnswerView = ({
  answer,
}) => (
<li className="answer__item"
  key={answer.id}
// onClick = {() => handlerClickAnswer(answer.id)}
>{answer.wordTranslate}</li>
);

AnswerView.propTypes = {
  answer: PropTypes.object,
};

export default AnswerView;
