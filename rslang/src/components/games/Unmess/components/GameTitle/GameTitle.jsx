import React from 'react';

import Popover from '../../../../../basicComponents/Popover';
import {
  gamesData,
  text
} from '../../../../../helpers/constants';

const GameTitle = () => (
  <div className="game-title-container">
    <h2 className="game-title-container__title game-title">{gamesData.unmess.title}</h2>
    <Popover
      className="game-title-container__question"
      descriptionClassName="game-title-container__description"
      title={<span className="question-icon"></span>}
      description={(
        <span> {text.ru.unmess.instruction} </span>
      )} />
  </div>
);

export default GameTitle;
