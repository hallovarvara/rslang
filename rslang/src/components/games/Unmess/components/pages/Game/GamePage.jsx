import React from 'react';
import PropTypes from 'prop-types';

const GamePage = () => (
  <div className="game">
    <div className="words-container">
      <div className="word">
        <span></span>
      </div>
    </div>
    <div className="definitions-container">
      <div className="definition">
        <span></span>
      </div>
    </div>
  </div>
);

GamePage.propTypes = {
  allWords: PropTypes.object,
};

export default GamePage;
