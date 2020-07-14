import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { text } from '../../../../../helpers/constants';

const SpeakButton = ({ isGameInProcess, onClick }) => {
  const classes = classNames({
    'buttons-container__speak-please': true,
    'buttons-container__speak-please_active': isGameInProcess,
  });
  return <div onClick={onClick} className={classes}><span>{text.ru.speakPlease}</span></div>;
};

SpeakButton.propTypes = {
  isGameInProcess: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SpeakButton;
