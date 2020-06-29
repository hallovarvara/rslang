import React from 'react';

import StartButton from '../../StartButton';

const StartPage = () => {
  return (
    <div className="start-page">
      <h2 className="start-page__title">Unmess</h2>
      <p className="start-page__description">Match the words with similar meaning below</p>
      <StartButton />
    </div>
  );
};

export default StartPage;
