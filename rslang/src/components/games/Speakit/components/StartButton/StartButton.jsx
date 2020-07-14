import React from 'react';
import { Link } from 'react-router-dom';

import { text } from '../../../../../helpers/constants';

const StartButton = () => (
  <button className="home-page-container__button"><Link to="/speakit/game" className="link-in-button">{text.ru.button.startGame}</Link></button>
);

export default StartButton;
