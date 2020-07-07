import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../basicComponents/Button';

const GameCardView = ({ data: { title, description, link } }) => (
    <div className="game-card">
      <h5 className="game-card__title">{title}</h5>
      <p className="game-card__description">{description}</p>
      <Link className="link-btn game-card__link-button-container" to={`/play-games/${link}`}>
        <Button type="secondary" value={`${title} →`}/>
      </Link>
    </div>
);

GameCardView.propTypes = {
  data: PropTypes.object,
};

export default GameCardView;
