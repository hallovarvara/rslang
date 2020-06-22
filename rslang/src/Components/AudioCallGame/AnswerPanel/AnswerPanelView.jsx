import React from 'react';
import '../style.scss';

import Answer from '../Answer';

const AnswerPanelView = () => (
  <ol className='answer__container'>
    <Answer />
    <Answer />
    <Answer />
    <Answer />
    <Answer />
  </ol>
);

export default AnswerPanelView;
