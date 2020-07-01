import React from 'react';
import { Link } from 'react-router-dom';

import StartButton from '../../StartButton';

const StartPage = () => {
  return (
    <div className="start-page">
      <h2 className="start-page__title">Unmess</h2>
      <p className="start-page__description">Match the words with similar meaning below</p>
      <Link to="/unmess/game">
        <StartButton />
      </Link>
    </div>
  );
};

export default StartPage;
