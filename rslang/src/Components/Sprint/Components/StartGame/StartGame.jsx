import React from 'react';

import PropTypes from 'prop-types';

import './StartGame.scss';

const StartGame = ({ startGame }) => {
  const [timer, setTimer] = React.useState(3);

  React.useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer((time) => time - 1);
      }, 1000);
    }
  }, [timer]);

  React.useEffect(() => {
    setTimeout(() => {
      startGame();
    }, 3000);
  }, []);

  return (
    <div className={'sprint-start__container'}>
      <div className={'sprint-start__timer'}>{timer}</div>
    </div>

  );
};

StartGame.propTypes = {
  startGame: PropTypes.func,
};

export default StartGame;
