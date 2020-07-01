import React from 'react';
import { Link } from 'react-router-dom';

const StartButton = () => (
  <button className="home-page-container__button"><Link to="/speakit/game" className="link-in-button">Start</Link></button>
);

export default StartButton;
