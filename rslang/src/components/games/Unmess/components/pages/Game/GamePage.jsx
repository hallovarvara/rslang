import React from 'react';
import PropTypes from 'prop-types';

const GamePage = ({
  currentWords,
}) => (
  <div className="game-page">
    <div className="game-title-container">
      <h2 className="game-title-container__title game-title">Unmess</h2>
    </div>
    <div className="game-container">
      <div className="words-container">
        <div className="word flex-div-with-span">
          <span>run</span>
        </div>
        <div className="word flex-div-with-span">
          <span>run</span>
        </div>
        <div className="word flex-div-with-span">
          <span>run</span>
        </div>
        <div className="word flex-div-with-span">
          <span>run</span>
        </div>
        <div className="word flex-div-with-span">
          <span>run</span>
        </div>
      </div>
      <div className="definitions-container">
        <div className="definition flex-div-with-span">
          <span>Move at a speed faster than a walk</span>
        </div>
        <div className="definition flex-div-with-span">
          <span>Move at a speed faster than a walk</span>
        </div>
        <div className="definition flex-div-with-span">
          <span>Move at a speed faster than a walk</span>
        </div>
        <div className="definition flex-div-with-span">
          <span>Move at a speed faster than a walk</span>
        </div>
        <div className="definition flex-div-with-span">
          <span>Move at a speed faster than a walk</span>
        </div>
      </div>
    </div>
    <div className="attempts-container">
      <div className="right-attempts-container">
        <div className="right-attempt">
          <div className="right-attempt__word flex-div-with-span">
            <span>run</span>
          </div>
          <div className="right-attempt__definition flex-div-with-span">
            <span>Move at a speed faster than a walk</span>
          </div>
        </div>
      </div>
      <div className="wrong-attempts-container">
        <div className="wrong-attempt">
          <div className="wrong-attempt__word flex-div-with-span">
            <span>run</span>
          </div>
          <div className="wrong-attempt__definition flex-div-with-span">
            <span>Move at a speed faster than a walk</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

GamePage.propTypes = {
  currentWords: PropTypes.arrayOf(PropTypes.object),
};

export default GamePage;
