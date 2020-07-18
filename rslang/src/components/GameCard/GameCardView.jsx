import React from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../basicComponents/Button';
import { getPath } from '../../helpers/functions';
import { text } from '../../helpers/constants';

const GameCardView = ({
  data: {
    title, description, icon,
    path, startPath,
  },
}) => (
  <div className="game-card">
    <img className="game-card__icon" src={icon} alt={`Иконка игры ${title}`} />
    <h5 className="game-card__title">{title}</h5>
    <p className="game-card__description">{Parser(description)}</p>
    <Link className="link-btn game-card__link-button-container" to={
      getPath(startPath ?? path)
    }>
      <Button type="secondary" value={`${text.ru.button.startGame}`} />
    </Link>
  </div>
);

GameCardView.propTypes = {
  data: PropTypes.object,
};

export default GameCardView;
