import React from 'react';
import PropTypes from 'prop-types';

const InputView = ({ placeholder = 'Type' }) => (
  <input className="input" placeholder={placeholder}></input>
);

InputView.propTypes = {
  placeholder: PropTypes.string,
};

export default InputView;
