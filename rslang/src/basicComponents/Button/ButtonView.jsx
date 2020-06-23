import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonView = ({ value = 'Button', type = 'primary', className = '' }) => {
  const classes = classNames({
    btn: true,
    [`btn-${type}`]: true,
    [className]: true,
  });
  return (
    <button className={classes}>{value}</button>
  );
};

ButtonView.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonView;
