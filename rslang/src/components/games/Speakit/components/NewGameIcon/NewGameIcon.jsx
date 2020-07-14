import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPath } from '../../../../../helpers/functions';
import { text, gamesData } from '../../../../../helpers/constants';

const NewGameIcon = ({
  currentLevel,
  levelChanged,
  abortGame,
}) => (
  <Link
    to={getPath(gamesData.speakit.startPath || gamesData.speakit.path)}
    className="navigation__new-game-icon"
    onClick={() => {
      abortGame();
      levelChanged(currentLevel);
    }}>
    {`← ${text.ru.newGame}`}
  </Link>
);

NewGameIcon.propTypes = {
  currentLevel: PropTypes.number,
  levelChanged: PropTypes.func,
  abortGame: PropTypes.func,
};

export default NewGameIcon;
