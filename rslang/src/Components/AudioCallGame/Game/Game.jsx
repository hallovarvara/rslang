import React from 'react';

import Question from '../Question';
import AnswerPanel from '../AnswerPanel';
import Button from '../Button';

const Game = () => (
  <div>
    <h2 className='title'>Game</h2>
    <Question />
    <AnswerPanel />
    <Button />
  </div>
);

export default Game;
