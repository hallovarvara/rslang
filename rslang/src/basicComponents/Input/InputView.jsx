import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputView = ({ placeholder = 'Type', className = '' }) => {
  const classes = classNames({
    input: true,
    [className]: true,
  });

  return (
    <input className={classes} placeholder={placeholder}></input>
  );
};

InputView.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default InputView;
