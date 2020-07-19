import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { text } from '../../../../../helpers/constants';

const StartButton = ({
  onClick = () => {},
}) => (
  <button onClick={onClick} className="home-page-container__button"><Link to="/speakit/game" className="link-in-button">{text.ru.button.startGame}</Link></button>
);

StartButton.propTypes = {
  onClick: PropTypes.func,
};

export default StartButton;
