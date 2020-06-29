import React from 'react';

import { Link } from 'react-router-dom';

const StartButton = () => (
  <button className="start-button"><Link className="link-btn" to="/unmess/game">Start</Link></button>
);

export default StartButton;
