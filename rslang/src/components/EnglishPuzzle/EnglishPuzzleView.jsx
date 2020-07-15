import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';

const EnglishPuzzleView = ({
  isStart,
  handleClickButtonStart,
  handleClickNewGame,
  backgroundUrl,
  isBackground,
  handleClickButtonBackground,
  paintingInfo,
  data,
  getLevel,
  numberLevel,
  getPage,
  numberPage,
}) => (
  <div className="container">
    {(!isStart)
      ? <StartPage
          getLevel={getLevel}
          handleClickButtonStart={handleClickButtonStart}
          numberLevel={numberLevel}
          getPage={getPage}
          numberPage={numberPage}
        />
      : <GamePage
          data={data}
          paintingInfo={paintingInfo}
          handleClickNewGame={handleClickNewGame}
          backgroundUrl={backgroundUrl}
          handleClickButtonBackground={handleClickButtonBackground}
          isBackground={isBackground}
        />}
  </div>
);

EnglishPuzzleView.propTypes = {
  isStart: PropTypes.bool,
  handleClickButtonStart: PropTypes.func,
  handleClickNewGame: PropTypes.func,
  backgroundUrl: PropTypes.string,
  isBackground: PropTypes.bool,
  handleClickButtonBackground: PropTypes.func,
  paintingInfo: PropTypes.object,
  data: PropTypes.array,
  getLevel: PropTypes.func,
  numberLevel: PropTypes.number,
  getPage: PropTypes.func,
  numberPage: PropTypes.number,
};

export default EnglishPuzzleView;
