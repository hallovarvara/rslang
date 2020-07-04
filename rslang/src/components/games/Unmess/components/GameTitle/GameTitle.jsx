import React from 'react';

import Popover from '../../../../../basicComponents/Popover';

const GameTitle = () => (
  <div className="game-title-container">
    <h2 className="game-title-container__title game-title">Unmess</h2>
    <Popover
      className="game-title-container__question"
      descriptionClassName="game-title-container__description"
      title={<span className="question-icon"></span>}
      description={(
        <span>Схватите слово и отпустите над <br></br> его значением</span>
      )} />
  </div>
);

export default GameTitle;
